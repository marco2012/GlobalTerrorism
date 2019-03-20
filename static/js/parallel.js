function parallel(data_to_read = 'terrorism.csv' ,filter_year=0, country=[]) {
    
    let max_rows_to_take = 12
    
    //remove graph
    var svg = d3.select("#parallelArea")
    svg.selectAll("canvas").remove()
    svg.selectAll("svg").remove()
    var svg1 = d3.select("#grid")
    svg1.select(".header").remove()
    svg1.selectAll(".row").remove()
    
    // var color1 = d3.scale.linear()
    // .domain([9, 100])
    // .range(["#dd0000", "#ddbb00"])
    // .interpolate(d3.interpolateLab);
    
    var color1 = d3.scale.ordinal().range(['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'])
    
    var color = function (d) { return color1(d['Attackers']); };
    
    var parcoords = d3.parcoords()("#parallelArea")
    .color(color)
    .alpha(0.98);
    
    d3.csv('data/'+data_to_read)
    .row(function (d) { 
        
        if (data_to_read =='cosine_similarity_data.csv'){
            return { //filter columns
                attacktype1: d.attacktype1,
                year: d.year,
                Attackers: d.nperps,
                Victims: d.nkill,
                Wound: d.nwound,
                Suicide: d.suicide == 0 ? "No" : "Yes",
                Country: d.country_txt,
                // Region: d.region_txt,
                "Attack type": d.attacktype1_txt,
                spacial_distance: d.spacial_distance
                // summary      : d.summary
            }
        } else return { //filter columns
            attacktype1: d.attacktype1,
            year: d.year,
            Attackers: d.nperps,
            Victims: d.nkill,
            Wound: d.nwound,
            Suicide: d.suicide == 0 ? "No" : "Yes",
            Country: d.country_txt,
            Region: d.region_txt,
            "Attack type": d.attacktype1_txt,
            // summary      : d.summary
        }
    })
    .get(function (e, data) {
        
        //Filter rows
        let cf = crossfilter(data)
        
        // filter years
        if (filter_year != 0){
            let byYear = cf.dimension(d => d.year)
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
            // console.log(data)
        }
        
        
        // sort by nkill descend
        if (data_to_read == 'terrorism.csv'){
            data.sort(function (a, b) {
                return b.Victims - a.Victims
            })
        }
        
        parcoords
        .data(data)
        .hideAxis(["attacktype1"])  //CONTROLLARE
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
                parcoords.unhighlight
            },
            "click": function (d) { 
                
                // document.getElementById('id01').style.display = 'block' //make block appear
                // $('#dialog_title_span').html('<h2>Attack summary</h2>')
                // $('#dialog_content_span').html("<br/>" + d.summary + "<br/><br/>")
                
                let v = [
                    parseInt(d.attacktype1), 
                    parseInt(d.Attackers), 
                    parseInt(d.Victims), 
                    parseInt(d.Wound)
                ]
                $.getJSON(
                    '/cosine_similarity',
                    { compute_cosine_similarity: selectedSliderYear + ";" + JSON.stringify(v) } ,
                    () => {
                        parallel(data_to_read = 'cosine_similarity_data.csv')
                    })
                } //click
            }); //on
            
            d3.selectAll(".col-0").remove() //rimuovo colonna summary
            
            //higlight on hover
            $('#grid .row').hover(function () {
                $(this).css('background-color', 'grey')
            }, function () {
                $('.row:odd').css('background', 'rgba(38,38,38,0.8)')
                $('.row:even').css('background-color', 'black')
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
                    "mouseout": parcoords.unhighlight,
                    "click": function (d) {
                        document.getElementById('id01').style.display = 'block' //make block appear
                        $('#dialog_title_span').html('<h2>Attack summary</h2>')
                        $('#dialog_content_span').html("<br/>" + d.summary + "<br/><br/>")
                    }
                });
                
                d3.selectAll(".col-0").remove() //rimuovo colonna summary
                
            });
            
        });
    }
    