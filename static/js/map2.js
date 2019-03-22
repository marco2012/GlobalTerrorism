var selectedCountries = [];    //selected countries

var svg = d3v4.select("svg"),
map_width = +svg.attr("width"),
map_height = +svg.attr("height");

function map2(filter_year = 0){
    
    // d3.selectAll("svg.g.legendThreshold").remove()
    // remove map
    // var svg = d3v4.select("#world-chart-2")
    // svg.select("countries").remove()
    // svg.select("legendThreshold").remove()
    // svg.selectAll("svg").remove()
    
    
    // var svg = d3v4.select("#world-chart-2")
    //     .append("svg")
    //     .attr("width", 600)
    //     .attr("height", 400)
    //     .append("g")
    //     .attr("transform", "translate(0,0)")
    
    // d3.select("g")
    //     .selectAll("path")
    //     .remove();

    //sizes
    let scaleSize = 0.88
    let width_negative_offset = 130
    let height_offset = 50
    let legend_translate_x = 620
    let legend_translate_y = 20

    // Map and projection
    var path = d3v4.geoPath();
    var projection = d3v4.geoNaturalEarth1()
    .scale(map_width / 2 / Math.PI)
    .translate([map_width / 2 - width_negative_offset, map_height / 2 + height_offset])
    var path = d3v4.geoPath()
    .projection(projection);
    
    // Data and color scale
    var dataForMap = d3.map();
    var colorScheme = d3v4.schemeReds[6];
    colorScheme.unshift("#eee")
    var colorScale = d3v4.scaleThreshold()
    .domain([1, 6, 11, 26, 101, 1001])
    .range(colorScheme);
    
    // Legend
    var g = svg.append("g")
    .attr("class", "legendThreshold")
        .attr("transform", "translate(" + legend_translate_x + "," + legend_translate_y+")")
    
    g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Victims")
    .style('fill', 'white')
    

    var labels = ['0', '> 1', '> 50', '> 200', '> 400', '> 600', '> 1000'];
    var legend = d3.legendColor()
    .labels(function (d) {
        return labels[d.i];
    })
    .shapePadding(4)
    .scale(colorScale);
    svg.select(".legendThreshold")
    .call(legend);

    //tooltip
    var tooltip = d3.select("svg").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    

    var availableCountries = []
    
    // Load external data and boot
    d3v4.queue()
    // .defer(d3v4.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3v4.json, "json/countries.geo.json")
    // .defer(d3v4.csv, "data/mooc-countries.csv", function (d) { 
    .defer(d3v4.csv, "data/terrorism_map.csv", function (d) { 
        
        availableCountries.push(d.country_txt)
        
        dataForMap.set(d.country_txt, +parseInt(d.nkill)); 
        
    })
    .await(ready);
    
    function ready(error, topo) {
        if (error) throw error;
        
        // Draw the map
        svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
        .attr("fill", function (d) {
            
            // Pull data for this country
            d.nkill = dataForMap.get(d.name) || 0
            
            // Set the color
            return colorScale(d.nkill)
            
        })
        .attr("d", path)
        .on("click", function (d) {
            console.log(d.name);
            
            if (availableCountries.indexOf(d.name) == -1){
                document.getElementById('id01').style.display = 'block' //make block appear
                $('#dialog_title_span').html('<h2>No data</h2>')
                $('#dialog_content_span').html("<br/>No data for selected country. Please choose another one.<br/><br/>")
            } else {
                selectedCountries.push(d.name)
                updateChartsAux()
            }

        })
        .on("mouseover", function(d) {
            // console.log(d.name)            
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d.name)
                .style("left", (d3v4.event.pageX) + "px")
                .style("top", (d3v4.event.pageY - 28) + "px");  
            
        })
        .on("mouseout", function() {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0); 
        })
        
        //scale
        svg.selectAll('g.countries').each(function (d) {
            d3.select(this).attr('transform', 'scale(' + scaleSize + ')')
        })
        
    }
    
}
