var selectedCountries = [];    //selected countries

let scaleSize = 0.85
let width_negative_offset = 46
let height_offset = 50

var svg = d3v4.select("svg"),
map_width = +svg.attr("width"),
map_height = +svg.attr("height");

// var div = d3.select("svg").append("div")
// .attr("class", "tooltip")
// .style("opacity", 0);

// var tooltip = d3.select("svg").append("div")
// .attr("class", "tooltip")
// .style("opacity", 0);


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
    .attr("transform", "translate(20,20)");
    g.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Victims")
    .style('fill', 'white')
    
    var labels = ['0', '>1', '> 50', '> 200', '> 400', '> 600', '> 1000'];
    var legend = d3.legendColor()
    .labels(function (d) {
        return labels[d.i];
    })
    .shapePadding(4)
    .scale(colorScale);
    svg.select(".legendThreshold")
    .call(legend);
    
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
            
            // d3.select(this).transition().duration(100).style("opacity", 1);
            // div.transition().duration(100).style("opacity", 1)
            // // div.text(d.name + ": " + d.nkill)
            //     // .style("left", (d3v4.event.pageX) + "px")
            //     // .style("top", (d3v4.event.pageY + 100) + "px")
            //     // .style('position', 'absolute')
            //     // .style('z-index', 1001)
            //     // .style('border-radius', '2px')
            //     // .style('color', '#0099FF')
            //     // .style('padding', '10px 15px')
            //     // .style('background', 'rgba(255, 255, 255, 0.7)')
            // tooltip.transition()
            //     .duration(250)
            //     .style("opacity", 1);
            // tooltip.html(
            //     "<p><strong>" + d.nkill + "</strong></p>" +
            //     "<table><tbody><tr><td class='wide'>Smoking rate in 1996:</td><td>" + d.nkill + "</td></tr>" 
            // )
            
        })
        .on("mouseout", function() {
            // d3.select(this)
            // .transition().duration(300)
            // .style("opacity", 0.8);
            // div.transition().duration(300)
            // .style("opacity", 0);
        })
        
        //scale
        svg.selectAll('g.countries').each(function (d) {
            d3.select(this).attr('transform', 'scale(' + scaleSize + ')')
        })
        
        
    }
    
}

function getAvailableCountries(data, filter_year){
    
    
    
    var array = []
    var country_school = crossfilter(data);
    
    var countries = country_school.dimension(function (d) {
        return d.country_txt;
    })
    
    var country = countries.group();
    var nations = country.all()
    
    if (filter_year == 0) {
        nations.forEach(function (entry) {
            array.push(entry.key)
        })
    } else {
        let byYear = country_school.dimension(d => d.year)
        if (filter_year != 0) {
            let f = byYear.filter(filter_year)
            let filtered = f.top(Infinity)
            filtered.forEach(function (d) {
                array.push(d.country_txt)
            })
        }
    }
    
    return array
}