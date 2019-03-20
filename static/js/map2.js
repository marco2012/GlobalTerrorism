var svg = d3v4.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var path = d3v4.geoPath();
var projection = d3v4.geoNaturalEarth1()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
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
    .text("Students");
var labels = ['0', '1-5', '6-10', '11-25', '26-100', '101-1000', '> 1000'];
var legend = d3.legendColor()
    .labels(function (d) { return labels[d.i]; })
    .shapePadding(4)
    .scale(colorScale);
svg.select(".legendThreshold")
    .call(legend);

// Load external data and boot
d3v4.queue()
    // .defer(d3v4.json, "http://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3v4.json, "json/countries.geo.json")
    .defer(d3v4.csv, "data/mooc-countries.csv", function (d) { 
        dataForMap.set(d.code, +d.total); 
        // console.log(data);
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

            console.log(JSON.stringify(dataForMap));
            

            // Pull data for this country
            d.total = dataForMap.get(d.id) || 0;

            // Set the color
            return colorScale(d.total);
        })
        .attr("d", path)
        .on("click", function (d) {
            console.log(d.name);

        })
}

// projection.on('renderlet.a', function (chart) {
//     dc.events.trigger(function () {
        
//         console.log("DIO");
        

//         // worldChart.selectAll("svg").on("click", function () {

//         //     selectedCountries = worldChart.filters();
//         //     //controllo se nazione selezionata presente in database
//         //     selectedCountries.forEach(function (elem) {
//         //         if (array.indexOf(elem) == -1) {
//         //             selectedCountries.splice(selectedCountries.indexOf(elem), 1)

//         //             // alert("No data for selected country")
//         //             document.getElementById('id01').style.display = 'block' //make block appear
//         //             $('#dialog_title_span').html('<h2>Error</h2>')
//         //             $('#dialog_content_span').html("<br/>No data for selected country. Please choose another one.<br/><br/>")

//         //             worldChart.filterAll();
//         //             dc.redrawAll();
//         //             //chiamare funzioni
//         //             // render('');

//         //         }
//         //     })

//         //     // console.log(selectedCountries);
//         //     updateChartsAux()
//         // })

//     })
// })