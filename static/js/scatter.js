
// http://bl.ocks.org/peterssonjonas/4a0e7cb8d23231243e0e

var margin = { top: 30, right: 200, bottom: 20, left: 30 },
outerWidth = 750, //aumentare per mostrare legenda
outerHeight = 450,
// width = outerWidth - margin.left - margin.right,
// height = outerHeight - margin.top - margin.bottom;
width = 350,
height = 330,
legend_x_axis_text_position = margin.bottom + 10,
legend_y_axis_text_position = -margin.left - 4

var x = d3.scale.linear().range([0, width]).nice();
var y = d3.scale.linear().range([height, 0]).nice();

var xCat = "comp_1", 
yCat = "comp_2", 
rCat = "region",
colorCat = "region";


var region_to_txt = { 
    1: "North America", 
    2: "Central America", //2: "Central America & Caribbean",
    3: "South America",
    4: "East Asia",
    5: "Southeast Asia",
    6: "South Asia",
    7: "Central Asia",
    8: "Western Europe",
    9: "Eastern Europe",
    10: "Middle East & North Africa",
    11: "Sub-Saharan Africa",
    12: "Australasia & Oceania"
};


function scatter() {
    
    // remove graph
    var svg = d3.select("#scatter")
    svg.selectAll("canvas").remove()
    svg.selectAll("svg").remove()
    
    
    d3.csv("data/pca.csv", function (data) {
        
        data.forEach(function (d) {
            d.comp_1 = +d.x;
            d.comp_2 = +d.y;
            d.region = +d.region;
        });
        
        var xMax = d3.max(data, function (d) { return d[xCat]; }) * 1.05,
        xMin = d3.min(data, function (d) { return d[xCat]; }),
        xMin = xMin > 0 ? 0 : xMin,
        yMax = d3.max(data, function (d) { return d[yCat]; }) * 1.05,
        yMin = d3.min(data, function (d) { return d[yCat]; }),
        yMin = yMin > 0 ? 0 : yMin;
        
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
        
        // var color = d3.scale.category10();
        var color = d3.scale.ordinal().range(['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'])
        
        var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function (d) {
            // return xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat];
            return "Country: " + d.country_txt + "<br>" +  "Attack: " + d.attacktype1_txt 
        });

        
        var zoomBeh = d3.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([0, 500])
        .on("zoom", zoom);
        
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
            // alert(JSON.stringify(d)) 
            document.getElementById('id01').style.display = 'block'
            $('#dialog_title_span').html('<h2>Attack region</h2>')
            $('#dialog_content_span').html("<br/><h4>" + region_to_txt[d.region] + "</h4><br/>")
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
            return region_to_txt[d] //converte numero regione in stringa
        })
        .style("font-size", "12px")
        
        d3.select("input").on("click", change);
        
        function change() {
            xCat = "";
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