// http://bl.ocks.org/peterssonjonas/4a0e7cb8d23231243e0e

// var region_to_txt = { 
//     1: "North America", 
//     2: "Central America", //2: "Central America & Caribbean",
//     3: "South America",
//     4: "East Asia",
//     5: "Southeast Asia",
//     6: "South Asia",
//     7: "Central Asia",
//     8: "Western Europe",
//     9: "Eastern Europe",
//     10: "Middle East & North Africa",
//     11: "Sub-Saharan Africa",
//     12: "Australia"
// };

let pca_data = "success"

function scatter() {

    var margin = { top: 30, right: 300, bottom: 20, left: 30 },
    outerWidth = 520, //aumentare per mostrare legenda
    outerHeight = 400,
    // width = outerWidth - margin.left - margin.right,
    // height = outerHeight - margin.top - margin.bottom;
    width = 350,
    height = 330,
    legend_x_axis_text_position = margin.bottom + 10,
    legend_y_axis_text_position = -margin.left - 0,
    scatter_start_x_axis = -1,
    scatter_start_y_axis = -1
    
    if (selectedSliderYear==0){
        scatter_start_x_axis = -3
        scatter_start_y_axis = -4
    }
    
    var x = d3.scale.linear().range([0, width]).nice();
    var y = d3.scale.linear().range([height, 0]).nice();
    
    let xCat = "comp_x"
    let yCat = "comp_y"
    let rCat = pca_data
    let colorCat = "attacktype1_txt"
    
    // var svg = d3.select("#scatter").selectAll("svg").remove()

    d3.csv("data/pca.csv", function (data) {
        
        data.forEach(function (d) {
            d.comp_x = +d.x;
            d.comp_y = +d.y;
            // d.region = +d.region;
            d.success = +d.success;
            d.nkill = +d.nkill;
            // d.attacktype1_txt = +d.attacktype1_txt;
        })
        
        var xMax = d3.max(data, function (d) { return d[xCat]; }) * 1.05,
        xMin = d3.min(data, function (d) { return d[xCat]; }),
        xMin = xMin > 0 ? 0 : xMin + scatter_start_x_axis,
        yMax = d3.max(data, function (d) { return d[yCat]; }) * 1.05,
        yMin = d3.min(data, function (d) { return d[yCat]; }),
        yMin = yMin > 0 ? 0 : yMin + scatter_start_y_axis;
        
        x.domain([xMin, xMax]);
        y.domain([yMin, yMax]);
        
        var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);
        
        var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width);
        
        // Define the line
        var valueline = d3.svg.line()
        .x(function (d) { return x(d.comp_x); })
        .y(function (d) { return y(d.comp_y); });
        
        var color = d3.scale.ordinal().range(['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'].reverse())
        
        var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function (d) {
            // return xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat];
            return "City: " + d.city + "<br>" + "Country: " + d.country_txt + "<br>" + "Attack: " + d.attacktype1_txt 
        });
        
        var zoomBeh = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([0, 500])
        .on("zoom", zoom);
        
        //SVG
        var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoomBeh);
        
        svg.call(tip);
        
        svg.append("rect")
        .attr("width", width)
        .attr("height", height);
        
        svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .classed("label", true)
        .attr("x", width)
        .attr("y", legend_x_axis_text_position)
        .style("text-anchor", "end")
        .text(xCat);
        
        svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
        .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("y", legend_y_axis_text_position)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(yCat);
        
        var objects = svg.append("svg")
        .classed("objects", true)
        .attr("width", width)
        .attr("height", height);
        
        objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0)
        .attr("transform", "translate(0," + height + ")");
        
        objects.append("svg:line")
        .classed("axisLine vAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height);
        
        objects.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .classed("dot", true)
        .attr("r", function (d) { return 6 * Math.sqrt(d[rCat] / Math.PI); })   //bugga
        .attr("transform", transform)
        .style("fill", function (d) { return color(d[colorCat]); })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .on("click", function (d) {
            document.getElementById('id01').style.display = 'block'
            $('#dialog_title_span').html('<h2>Attack description</h2>')
            $('#dialog_content_span').html("<br/><h4>" + d.summary + "</h4><br/>")
        })
        
        var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .classed("legend", true)
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });
        
        legend.append("circle")
        .attr("r", 3.5)
        .attr("cx", width + 20)
        .attr("fill", color);
        
        legend.append("text")
        .attr("x", width + 26)
        .attr("dy", ".35em")
        .text(function (d) {
            // return region_to_txt[d] //converte numero regione in stringa
            return d;
        })
        .style("font-size", "12px")
        
        // update data https://stackoverflow.com/questions/36360509/d3js-scatter-plot-auto-update-doesnt-work
        $("#update_btn").click(function () {
            updateScatter(reset = false)
        });
        $("#world-map-region-trigger").click(function () {
            updateScatter(reset = false)
        });
        // $('#grid .row').click(function () {
        //     updateScatter(reset = false)
        // });
        $("#reset_btn").click(function () {
            // updateScatter(reset = true)
            location.reload();
        });

        function notNull(array){
            return (typeof array !== 'undefined' && array.length > 0) 
        }
        
        function updateScatter(reset) {
            
            var options = { computePCA: selectedSliderYear + ";" + JSON.stringify(selectedCountries) + ";" + JSON.stringify(selectedWeapType) }
            if (reset) options = { computePCA: 0 + ";" + JSON.stringify([]) + ";" + JSON.stringify([]) }
            console.log(options);
            
            $.getJSON(
                '/pca',
                options,
                () => {
                    // Get the data again
                    d3.csv("data/pca.csv", function (data) {
                        data.forEach(function (d) {
                            d.comp_x = +d.x;
                            d.comp_y = +d.y;
                            d.success = +d.success;
                            d.nkill = +d.nkill;
                        })
                        
                        // Scale the range of the data again 
                        var xMax = d3.max(data, function (d) { return d[xCat]; }) * 1.05,
                        xMin = d3.min(data, function (d) { return d[xCat]; }),
                        xMin = xMin > 0 ? 0 : xMin + scatter_start_x_axis,
                        yMax = d3.max(data, function (d) { return d[yCat]; }) * 1.05,
                        yMin = d3.min(data, function (d) { return d[yCat]; }),
                        yMin = yMin > 0 ? 0 : yMin + scatter_start_y_axis;
                        
                        x.domain([xMin, xMax]);
                        y.domain([yMin, yMax]);
                        
                        var xAxis = d3.svg.axis()
                        .scale(x)
                        .orient("bottom")
                        .tickSize(-height);
                        
                        var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient("left")
                        .tickSize(-width);
                        
                        var zoomBeh = d3.behavior.zoom()
                        .x(x)
                        .y(y)
                        .scaleExtent([0, 500])
                        .on("zoom", zoom);
                        
                        //SVG
                        var svg = d3.select("#scatter").call(zoomBeh);
                        var circle = svg.selectAll("circle").data(data)
                        var legend = svg.selectAll(".legend").data(color.domain())
                        
                        svg.select(".x.axis") // change the x axis
                        .transition()
                        .duration(750)
                        .call(xAxis);
                        
                        svg.select(".y.axis") // change the y axis
                        .transition()
                        .duration(750)
                        .call(yAxis);
                        
                        // svg.select(".line")   // change the line
                        // .transition()
                        // .duration(750)
                        // .attr("d", valueline(data));
                        
                        //Update all circles
                        circle.transition()
                        .duration(1000)
                        .attr("cx", function (d) {
                            return x(d.comp_x)
                        })
                        // .attr("cy", function (d) {
                        //     return y(d.comp_y)
                        // });
                        
                        // enter new circles
                        circle.enter()
                        .append("circle")
                        // .filter(function (d) { return d.temperature > 30 })
                        .attr("r", function (d) { return 6 * Math.sqrt(d[rCat] / Math.PI); })   //bugga
                        .attr("transform", transform)
                        .style("fill", function (d) { return color(d[colorCat]); })
                        .attr("cx", function (d) {
                            return x(d.comp_x)
                        })
                        // .attr("cy", function (d) {
                        //     return y(d.comp_y)
                        // })
                        
                        // remove old circles
                        svg.selectAll(".dot").transition().duration(1000).attr("transform", transform);
                        circle.exit().remove()

                        legend.selectAll('circle').remove()
                        legend.append("circle")
                            .attr("r", 3.5)
                            .attr("cx", width + 20)
                            .attr("fill", color);

                    })
                })
                
            }
            
            function change() {
                xCat = "comp_x";
                xMax = d3.max(data, function (d) { return d[xCat]; });
                xMin = d3.min(data, function (d) { return d[xCat]; });
                
                zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));
                
                var svg = d3.select("#scatter").transition();
                
                svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);
                
                objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
            }
            
            function zoom() {
                svg.select(".x.axis").call(xAxis);
                svg.select(".y.axis").call(yAxis);
                
                svg.selectAll(".dot")
                .attr("transform", transform);
            }
            
            function transform(d) {
                return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
            }
        });
        
    }