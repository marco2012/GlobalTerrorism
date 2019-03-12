

function drawParallel() {

    max_rows_to_take = 12
    db_name = 'terrorism.csv'

    // var type = document.getElementById("type").value
    // console.log(type)
    var svg = d3.select("#parallelArea")
    svg.selectAll("canvas").remove()
    svg.selectAll("svg").remove()
    var svg1 = d3.select("#grid")
    svg1.select(".header").remove()
    svg1.selectAll(".row").remove()
    
    var color1 = d3.scale.linear()
    .domain([9, 100])
    .range(["#dd0000", "#ddbb00"])
    .interpolate(d3.interpolateLab);
        
    var color = function (d) { return color1(d['nperps']); };
        
        var parcoords = d3.parcoords()("#parallelArea")
        .color(color)
        .alpha(0.98);
        
        // // load csv file and create the chart
        // d3.csv('world_ranking.csv', function (data) {
        //     if (type == "Cwur") {
        //         data.forEach(function (element) {
        //             element.broad_impact = Number(parseFloat(element.broad_impact).toFixed(3))
        //             element.citations = Number(parseFloat(element.citations).toFixed(3))
        //             element.education = Number(parseFloat(element.education).toFixed(3))
        //             element.employment = Number(parseFloat(element.employment).toFixed(3))
        //             element.faculty = Number(parseFloat(element.faculty).toFixed(3))
        //             element.influence = Number(parseFloat(element.influence).toFixed(3))
        //             element.patents = Number(parseFloat(element.patents).toFixed(3))
        //             element.publications = Number(parseFloat(element.publications).toFixed(3))
        //         })
        //     }
        d3.csv('data/' + db_name)
        .row(function (d) {
            return { //filter data
                year: d.year,
                nperps: d.nperps,
                nkill: d.nkill,
                nwound: d.nwound,
                region_txt: d.region_txt,
                suicide: d.suicide,
                attacktype1_txt: d.attacktype1_txt,
            };
        })
        .get(function (e, data) {
            
            data.sort(function (a, b) {
                return b.nkill - a.nkill
            });
            
            parcoords
            .data(data)
            // .hideAxis(["country", "x", "y", "NaN", "Unnamed: 0", "institution"])
            .render()
            .reorderable()
            .brushMode("1D-axes");  // enable brushing
            
            // create data table, row hover highlighting
            var grid = d3
            .divgrid();
            d3
            .select("#grid")
            .datum(data.slice(0, max_rows_to_take))
            .call(grid)
            .selectAll(".row")
            .on({
                "mouseover": function (d) { parcoords.highlight([d]) },
                "mouseout": parcoords.unhighlight,
                "click": function (d) { 
                    // alert(JSON.stringify(d)) 
                    document.getElementById('id01').style.display = 'block'
                    $('#dialog_title_span').text(JSON.stringify(d));
                }
            });
            
            // if (type == "Shanghai") {
            //     d3.selectAll(".col-8").remove()
            //     d3.selectAll(".col-9").remove()
            //     d3.selectAll(".col-10").remove()
            // }
            // else if (type == "Cwur") {
                
            //     d3.selectAll(".col-14").remove()
            //     d3.selectAll(".col-8").remove()
            //     d3.selectAll(".col-12").remove()
            //     d3.selectAll(".col-13").remove()
            //     d3.selectAll(".col-10").remove()
            // }
            // else {
            //     d3.selectAll(".col-11").remove()
            //     d3.selectAll(".col-12").remove()
            //     d3.selectAll(".col-13").remove()
            // }
            
            // update data table on brush event
            parcoords.on("brush", function (d) {
                d3
                .select("#grid")
                .datum(d.slice(0, 10))
                .call(grid)
                .selectAll(".row")
                .on({
                    "mouseover": function (d) { parcoords.highlight([d]) },
                    "mouseout": parcoords.unhighlight
                });
                // if (type == "Shanghai") {
                //     d3.selectAll(".col-8").remove()
                //     d3.selectAll(".col-9").remove()
                //     d3.selectAll(".col-10").remove()
                // }
                // else if (type == "Cwur") {
                    
                //     d3.selectAll(".col-14").remove()
                //     d3.selectAll(".col-8").remove()
                //     d3.selectAll(".col-12").remove()
                //     d3.selectAll(".col-13").remove()
                //     d3.selectAll(".col-10").remove()
                // }
                // else {
                //     d3.selectAll(".col-11").remove()
                //     d3.selectAll(".col-12").remove()
                // }
                
            });
        });
}

function updateParallel() {
    // var type = document.getElementById("type").value
    var svg = d3.select("#parallelArea")
    svg.selectAll("canvas").remove()
    svg.selectAll("svg").remove()
    var svg1 = d3.select("#grid")
    svg1.select(".header").remove()
    svg1.selectAll(".row").remove()
    
    var color11 = d3.scale.linear()
    .domain([9, 100])
    .range(["white", "red"])
    .interpolate(d3
        .interpolateLab);
        
        var color22 = d3.scale.linear()
        .domain([9, 50])
        .range(["yellow", "green"])
        .interpolate(d3
            .interpolateLab);
            
            var color = function (d) { return color11(d['total_score']); };
            
            var parcoords = d3.parcoords()("#parallelArea")
            .color(color)
            .alpha(0.98);
            
            // load csv file and create the chart
            d3.csv('world_ranking1.csv', function (data) {
                
                if (type == "Cwur") {
                    data.forEach(function (element) {
                        element.broad_impact = Number(parseFloat(element.broad_impact).toFixed(3))
                        element.citations = Number(parseFloat(element.citations).toFixed(3))
                        element.education = Number(parseFloat(element.education).toFixed(3))
                        element.employment = Number(parseFloat(element.employment).toFixed(3))
                        element.faculty = Number(parseFloat(element.faculty).toFixed(3))
                        element.influence = Number(parseFloat(element.influence).toFixed(3))
                        element.patents = Number(parseFloat(element.patents).toFixed(3))
                        element.publications = Number(parseFloat(element.publications).toFixed(3))
                    })
                }
                
                parcoords
                .data(data)
                .hideAxis(["country", "x", "y", "university_name", "national_rank", "institution"])
                .render()
                .reorderable()
                .brushMode("1D-axes");  // enable brushing
                
                // create data table, row hover highlighting
                var grid = d3
                .divgrid();
                d3
                .select("#grid")
                .datum(data.slice(0, 10))
                .call(grid)
                .selectAll(".row")
                .on({
                    "mouseover": function (d) { parcoords.highlight([d]) },
                    "mouseout": parcoords.unhighlight
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
                        "mouseout": parcoords.unhighlight
                    });
                    // if (type == "Shanghai") {
                    //     d3.selectAll(".col-8").remove()
                    //     d3.selectAll(".col-9").remove()
                    //     d3.selectAll(".col-10").remove()
                    // }
                    // else if (type == "Cwur") {
                        
                    //     d3.selectAll(".col-13").remove()
                    //     d3.selectAll(".col-7").remove()
                    //     d3.selectAll(".col-9").remove()
                    //     d3.selectAll(".col-11").remove()
                    //     d3.selectAll(".col-12").remove()
                    // }
                    // else {
                    //     d3.selectAll(".col-12").remove()
                    //     d3.selectAll(".col-13").remove()
                    // }
                });
                // if (type == "Shanghai") {
                //     console.log("ciao")
                //     d3.selectAll(".col-8").remove()
                //     d3.selectAll(".col-9").remove()
                //     d3.selectAll(".col-10").remove()
                // }
                // else if (type == "Cwur") {
                    
                //     d3.selectAll(".col-13").remove()
                //     d3.selectAll(".col-7").remove()
                //     d3.selectAll(".col-11").remove()
                //     d3.selectAll(".col-12").remove()
                // }
                // else {
                //     d3.selectAll(".col-12").remove()
                //     d3.selectAll(".col-13").remove()
                // }
                
            });
            
        }
        
        
        function resetparallel() {
            var type = document.getElementById("type").value
            var svg = d3.select("#parallelArea")
            svg.selectAll("canvas").remove()
            svg.selectAll("svg").remove()
            var svg1 = d3.select("#grid")
            svg1.select(".header").remove()
            svg1.selectAll(".row").remove()
            
            var color1 = d3.scale.linear()
            .domain([9, 100])
            .range(["white", "red"])
            .interpolate(d3
                .interpolateLab);
                
                color2 = d3.scale.linear()
                .domain([9, 50])
                .range(["yellow", "red"])
                .interpolate(d3
                    .interpolateLab);
                    
                    var color = function (d) { return color1(d['total_score']); };
                    
                    var parcoords = d3.parcoords()("#parallelArea")
                    .color(color)
                    .alpha(0.98);
                    
                    // load csv file and create the chart
                    d3.csv('world_ranking.csv', function (data) {
                        
                        if (type == "Cwur") {
                            data.forEach(function (element) {
                                element.broad_impact = Number(parseFloat(element.broad_impact).toFixed(3))
                                element.citations = Number(parseFloat(element.citations).toFixed(3))
                                element.education = Number(parseFloat(element.education).toFixed(3))
                                element.employment = Number(parseFloat(element.employment).toFixed(3))
                                element.faculty = Number(parseFloat(element.faculty).toFixed(3))
                                element.influence = Number(parseFloat(element.influence).toFixed(3))
                                element.patents = Number(parseFloat(element.patents).toFixed(3))
                                element.publications = Number(parseFloat(element.publications).toFixed(3))
                            })
                        }
                        
                        
                        parcoords
                        .data(data)
                        .hideAxis(["country", "x", "y", "university_name", "NaN", "national_rank", "institution"])
                        .render()
                        .reorderable()
                        .brushMode("1D-axes");  // enable brushing
                        
                        // create data table, row hover highlighting
                        var grid = d3
                        .divgrid();
                        d3
                        .select("#grid")
                        .datum(data.slice(0, 10))
                        .call(grid)
                        .selectAll(".row")
                        .on({
                            "mouseover": function (d) { ; parcoords.highlight([d]) },
                            "mouseout": parcoords.unhighlight
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
                                "mouseout": parcoords.unhighlight
                            });
                            if (type == "Shanghai") {
                                d3.selectAll(".col-8").remove()
                                d3.selectAll(".col-9").remove()
                                d3.selectAll(".col-10").remove()
                            }
                            else if (type == "Cwur") {
                                
                                d3.selectAll(".col-10").remove()
                                d3.selectAll(".col-11").remove()
                                d3.selectAll(".col-12").remove()
                                d3.selectAll(".col-13").remove()
                            }
                            else {
                                d3.selectAll(".col-11").remove()
                                d3.selectAll(".col-12").remove()
                            }
                        });
                        if (type == "Shanghai") {
                            d3.selectAll(".col-8").remove()
                            d3.selectAll(".col-9").remove()
                            d3.selectAll(".col-10").remove()
                        }
                        else if (type == "Cwur") {
                            
                            d3.selectAll(".col-10").remove()
                            d3.selectAll(".col-11").remove()
                            d3.selectAll(".col-12").remove()
                            d3.selectAll(".col-13").remove()
                        }
                        else {
                            d3.selectAll(".col-11").remove()
                            d3.selectAll(".col-12").remove()
                        }
                    });
                }
                