var selectedCountries = [];    //selected countries

function map(filter_year=0) {
    // dc.config.defaultColors(d3v4.schemeReds[9])
    dc.redrawAll();
    var worldChart = dc.geoChoroplethChart("#world-chart");
    var numberFormat = d3v4.format(".2f");
    var array = []
    let projection = d3v4.geoNaturalEarth1() // https://github.com/d3/d3-geo/blob/master/README.md#azimuthal-projections
    
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
            // console.log(JSON.stringify(statesJson));
            worldChart
            .width(1000)
            .height(480)
            .dimension(countries)
            .group(country)
            // .colors(d3v4.scaleQuantize().range(d3v4.schemeReds[9]))
            .colorDomain([0, 60])
            .colorCalculator(function (d) { return d ? worldChart.colors()(d) : '#ccc'; })
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
                        console.log(selectedCountries);
                        updateCharts(country=selectedCountries)
                        // render(selectedCountries);
                    })
                    
                })

                

            })
            .legend(dc.legend().x(250).y(10))
            
            
            dc.renderAll();
        });
        
        
        
    });
}