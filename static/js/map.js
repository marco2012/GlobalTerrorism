var selectedCountries = [];    //selected countries

function map(filter_year=0) {
    // dc.config.defaultColors(d3v4.schemeReds[9])
    // dc.redrawAll();
    
    var worldChart = dc.geoChoroplethChart("#world-chart");
    var array      = []
    
    let projection = d3v4.geoNaturalEarth1()  // https://github.com/d3/d3-geo/blob/master/README.md#azimuthal-projections
    let scaleSize  = 0.8                      // https://stackoverflow.com/questions/48914465/dc-js-geochoroplethchart-width-smaller-than-500-crops-the-map
    let width      = 800
    let height     = 400

    // var svg = d3.select("#world-chart")
    // // Legend
    // var g = svg.append("g")
    //     .attr("class", "legendThreshold")
    //     .attr("transform", "translate(20,20)");
    // g.append("text")
    //     .attr("class", "caption")
    //     .attr("x", 0)
    //     .attr("y", -6)
    //     .text("Students");
    // var labels = ['0', '> 1', '> 50', '> 100', '> 200', '> 300', '> 600'];
    // var legend = d3.legendColor()
    //     .labels(function (d) { return labels[d.i]; })
    //     .shapePadding(4)
    //     .scale(colorScale);
    // svg.select(".legendThreshold")
    //     .call(legend);

    var colorScheme = d3v4.schemeReds[6];
    colorScheme.unshift("#eee")
    var colorScale = d3v4.scaleThreshold()
        .domain([1, 6, 11, 26, 101, 1001])
        .range(colorScheme);

    //the iso code of the country is the key
    // var group = dim.group().reduce(
    //     function (p, v) {
    //         p.total += +v.total;
    //         if (p.iso == "") {
    //             p.iso = v.country;
    //         }
    //         return p;
    //     },
    //     function (p, v) {
    //         p.total -= +v.total;
    //         return p;
    //     },
    //     function () {
    //         return {
    //             total: 0, iso: ""
    //         };
    //     });
    
    d3v4.csv("data/terrorism.csv", function (data4) {
        
        //filter
        var country_school = crossfilter(data4);
        var countries = country_school.dimension(function (d) {
            return d.country_txt;
        })
        var country = countries.group();
        var nations = country.all()
        
        if (filter_year==0){
            nations.forEach(function (entry) {
                array.push(entry.key)
            })
        } else {
            let byYear = country_school.dimension(d => d.year)
            if (filter_year != 0) {
                let f = byYear.filter(filter_year)
                let filtered = f.top(Infinity)
                // console.log(JSON.stringify(data))
                filtered.forEach(function (d) {
                    array.push(d.country_txt)
                })
            }
        }
        
        //creo mappa
        d3v4.json("json/countries.geo.json", function (statesJson) {
            // console.log(JSON.stringify(statesJson));
            worldChart
            .width(width)
            .height(height)
            .dimension(countries)
            .group(country)
            // .colors(d3v4.scaleQuantize().range(d3v4.schemeReds[9]))
            // .colors(['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'])
            // .colorDomain([0, 60])
            .colorAccessor(function (d) { //https://stackoverflow.com/questions/42519616/set-the-color-in-a-choropleth-based-on-the-key
                // console.log(d);
                if (!d)
                    return null; // area without data
                // // now d.value.iso contains the key, and d.value.total contains the value
                // // return colorIndex(d.value.iso, d.value.total);// do magic
                // return colorIndex(d.value.iso, d.value.total);// do magic
                return colorScale(d)
                })
            .colorCalculator(function (d) { return d ? worldChart.colors()(d) : '#fff'; })

            .overlayGeoJson(statesJson.features, "name", function (d) {
                return d.name;
            })
            .projection(projection)
            .on('renderlet.a', function (chart) {
                dc.events.trigger(function () {
                    worldChart.selectAll("svg").on("click", function () {
                        
                        selectedCountries = worldChart.filters();
                        //controllo se nazione selezionata presente in database
                        selectedCountries.forEach(function (elem) {
                            
                            if (array.indexOf(elem) == -1) {
                                selectedCountries.splice(selectedCountries.indexOf(elem), 1)
                                
                                // alert("No data for selected country")
                                document.getElementById('id01').style.display = 'block' //make block appear
                                $('#dialog_title_span').html('<h2>Error</h2>')
                                $('#dialog_content_span').html("<br/>No data for selected country. Please choose another one.<br/><br/>")
                                
                                worldChart.filterAll(); 
                                dc.redrawAll();
                                //chiamare funzioni
                                // render('');
                                
                            }

                        })
                        
                        // console.log(selectedCountries);
                        updateChartsAux()
                    })
                    
                })
            })
            .legend(dc.legend().x(250).y(100))
            
            dc.renderAll();
            
            worldChart.selectAll('g.name').each(function (d) {
                d3.select(this).attr('transform', 'scale(' + scaleSize + ')')
            })
            
        });
        
        
        
    });
}