
function parallel(data_to_read = 'terrorism.csv' ,filter_year=0, country=[], weaptype=[]) {
    
    let max_rows_to_take = 10
    
    //remove graph
    var svg = d3.select("#parallelArea")
    svg.selectAll("canvas").remove()
    svg.selectAll("svg").remove()
    var svg1 = d3.select("#grid")
    svg1.select(".header").remove()
    svg1.selectAll(".row").remove()
    
    d3.csv('data/'+data_to_read)
    .row(function (d) { 
        
        if (data_to_read =='cosine_similarity_data.csv'){
            return { //filter columns
                attacktype1: d.attacktype1,
                Year: d.year,
                Attackers: d.nperps,
                Victims: d.nkill,
                Wound: d.nwound,
                Suicide: d.suicide == 0 ? "No" : "Yes",
                Country: d.country_txt,
                // Region: d.region_txt,
                "Attack type": d.attacktype1_txt,
                Weapon_type: d.weaptype1_txt,
                spacial_distance: parseFloat(d.spacial_distance).toFixed(6)
                // summary      : d.summary
            }
        } else return { //filter columns
            eventid: d.eventid,
            attacktype1: d.attacktype1,
            Year: d.year,
            Attackers: d.nperps,
            Victims: d.nkill,
            Wound: d.nwound,
            Suicide: d.suicide == 0 ? "No" : "Yes",
            Duration: d.extended == 0 ? "<24h" : ">24h",
            Country: d.country_txt,
            Region: d.region_txt,
            "Attack type": d.attacktype1_txt,
            Weapon_type: d.weaptype1_txt
            // summary      : d.summary
        }
    })
    .get(function (e, data) {   

        // let attacktype_colors = ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#80cdc1', '#b8e186', '#7fbc41', '#4d9221', '#276419']
        
        let weaptype_colors = ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#02818a', '#2b8cbe', '#0868ac', '#084081'].reverse()
        
        // let nkill_colors = ['#fffff', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d', 'a40000'].reverse()

        // let colors_array = attacktype_colors

        // var color1 = d3.scale.ordinal().range(colors_array)

        // var color = function (d) { return color1(d["Attack type"]) }
//  ['#f0ffff','#dae0f1','#c2c2e1','#a9a6d1','#8f8bc0','#7272ae','#7cf3d0','#77dbc6','#70c5bd','#69adb2','#6098a8','#008b8b'].reverse()
        var color = function (d) {
            switch (d.Weapon_type) {
                case "Unknown":
                    return '#f0ffff';
                case "Other":
                    return '#dae0f1';
                case "Melee":
                    return '#8f8bc0';
                case "Vehicle (not to include vehicle-borne explosives, i.e., car or truck bombs)":
                    return '#7272ae';
                case "Chemical":
                    return '#7cf3d0';
                case "Incendiary":
                    return '#77dbc6';
                case "Fake Weapons":
                    return '#70c5bd';
                case "Explosives":
                    return '#69adb2';
                case "Radiological":
                    return '#6098a8';
                case "Biological":
                    return '#a9a6d1';
                case "Sabotage Equipment":
                    return '#c2c2e1';
                case "Firearms":
                    return '#008b8b';
                default:
                    break;
            }
        };

        var parcoords = d3.parcoords()("#parallelArea")
            .color(color)
            .alpha(0.98);
        
        //Filter rows
        let cf = crossfilter(data)
        
        // filter years
        if (filter_year != 0){
            let byYear = cf.dimension(d => d.Year)
            let f      = byYear.filter(filter_year)
            data       = f.top(Infinity)
        }
        
        //filter countries
        if (typeof country !== 'undefined' && country.length > 0){
            let byCountry = cf.dimension(d => d.Country)
            
            function multivalue_filter(values) {
                return function (v) {
                    return values.indexOf(v) !== -1;
                };
            }
            let f = byCountry.filterFunction(multivalue_filter(country));
            data = f.top(Infinity)
        }
        
        //filter weaptype
        if (typeof weaptype !== 'undefined' && weaptype.length > 0) {
            let byWeaponType = cf.dimension(d => d.Weapon_type)

            function multivalue_filter(values) {
                return function (v) {
                    return values.indexOf(v) !== -1;
                };
            }
            let f = byWeaponType.filterFunction(multivalue_filter(weaptype));
            data = f.top(Infinity)
        }

        if (data.length == 0) {
            $('#no_data').html("<h1>No data for selected options.</h1>")
        } else {
            $('#no_data').empty()

            var dimensions = []
            
            if (data_to_read == 'terrorism.csv'){
                
                // sort by nkill descend
                data.sort(function (a, b) {
                    return b.Victims - a.Victims
                })
                
                dimensions = ["Year", "Attackers", "Victims", "Wound", "Region", "Suicide", "Duration" , "Attack type"]
                
            } else if ( data_to_read == 'cosine_similarity_data.csv' ) {
                // if (filter_year == 0) dimensions = ["Year", "Attackers", "Victims", "Wound", "Suicide", "Attack type", "spacial_distance"]
                // else 
                dimensions = ["Attackers", "Victims", "Wound", "Suicide", "Attack type", "spacial_distance"]
                
            }
            
            parcoords
            .data(data)
            .detectDimensions()
            .dimensions(dimensions)
            .render()
            .reorderable()
            .brushMode("1D-axes")  // enable brushing
            
            // create data table, row hover highlighting
            var grid = d3.divgrid();
            d3
            .select("#grid")
            .datum(data.slice(0, max_rows_to_take))
            .call(grid)
            .selectAll(".row")
            .on({
                "mouseover": function (d) { 
                    parcoords.highlight([d]) 
                },
                "mouseout": (d) => {
                    parcoords.unhighlight([d])
                },
                "click": function (d) { 
                    
                    // document.getElementById('id01').style.display = 'block' //make block appear
                    // $('#dialog_title_span').html('<h2>Attack summary</h2>')
                    // $('#dialog_content_span').html("<br/>" + d.summary + "<br/><br/>")
                    
                    selectedSliderYear = parseInt(d.Year)
                    let v = [
                        parseInt(d.eventid),
                        parseInt(d.attacktype1), 
                        parseInt(d.Attackers), 
                        parseInt(d.Victims), 
                        parseInt(d.Wound)
                    ]
                    $.getJSON(
                        '/cosine_similarity',
                        { compute_cosine_similarity: selectedSliderYear + ";" + JSON.stringify(v) } ,
                        () => {
                            updateCharts(csv = 'cosine_similarity_data.csv')
                            parallel(data_to_read = 'cosine_similarity_data.csv')
                        })

                    $('#world-map-region-trigger').click(); // trigger scatterplot update based 

                    } //click
                }); //on
                
                if (data_to_read = 'terrorism.csv') {
                d3.selectAll(".col-0").remove() //rimuovo colonna 
                d3.selectAll(".col-1").remove() //rimuovo colonna 
                }
                
                //higlight on hover
                $('#grid .row').hover(function () {
                    $(this).css('background-color', '#466A93')
                }, function () {
                    $('.row:even').css('background', '#24303F')
                    $('.row:odd').css('background-color', '#1A222C')
                });
                
                // update data table on brush event
                parcoords.on("brush", function (d) {
                    d3
                    .select("#grid")
                    .datum(d.slice(0, 10))
                    .call(grid)
                    .selectAll(".row")
                    .on({
                        "mouseover": function (d) { parcoords.highlight([d]) },
                        "mouseout": function (d) { 
                            parcoords.unhighlight([d]) 
                        },
                        // "click": function (d) {
                        //     document.getElementById('id01').style.display = 'block' //make block appear
                        //     $('#dialog_title_span').html('<h2>Attack summary</h2>')
                        //     $('#dialog_content_span').html("<br/>" + d.summary + "<br/><br/>")
                        // }
                    })
                    
                });

                

            } 
        });
    }
    