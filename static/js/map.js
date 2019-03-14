function map(filter_year=0) {
    // dc.config.defaultColors(d3v4.schemeReds[9])
    var worldChart = dc.geoChoroplethChart("#world-chart");
    var numberFormat = d3v4.format(".2f");
    var filter = [];
    var array = []
    
    d3v4.csv("data/terrorism.csv", function (data4) {
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
            worldChart
            .width(900)
            .height(500)
            .dimension(countries)
            .group(country)
            // .colors(d3v4.scaleQuantize().range(d3v4.schemeReds[9]))
            .colorDomain([0, 60])
            .colorCalculator(function (d) { return d ? worldChart.colors()(d) : '#ccc'; })
            .overlayGeoJson(statesJson.features, "name", function (d) {
                return d.name;
            })
            .projection(d3v4.geoConicEqualArea())
            .on('renderlet.a', function (chart) {
                dc.events.trigger(function () {
                    worldChart.selectAll("svg").on("click", function () {
                        
                        filter = worldChart.filters();
                        
                        filter.forEach(function (elem) {
                            if (array.indexOf(elem) == -1) {
                                filter.splice(filter.indexOf(elem), 1)
                                alert("No data for the selected country")
                                worldChart.filterAll(); 
                                dc.redrawAll();
                                //chiamare funzioni
                                // render('');
                                
                            }
                        })

                        console.log(filter);
                        updateCharts(country=filter)
                        // render(filter);
                    })
                    
                })
            })
            .legend(dc.legend().x(250).y(10))
            
            
            dc.renderAll();
        });
        
        
        
    });
}