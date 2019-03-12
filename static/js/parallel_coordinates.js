
var green_to_blue = d3.scale.linear()
.domain([9, 50])
    .range(["#dd0000", "#ddbb00"])
.interpolate(d3.interpolateLab);

var color = function (d) { 
    return green_to_blue(d['nperps']); 
};

var parcoords = d3.parcoords()("#example")
.color(color)
.alpha(0.4);

// load csv file and create the chart
d3.csv('data/terrorism-small.csv')
.row(function (d) {
    return { //filter data
        year: d.year,
        nperps: d.nperps,
        nkill: d.nkill,
        nwound: d.nwound,
        region_txt: d.region_txt,
        attacktype1_txt: d.attacktype1_txt,
    };
})
.get(function (e, data) {
    
    data.sort(function (a, b) {
        return b.nkill - a.nkill
    });

    // console.log(JSON.stringify(data))
    // data = d3.descending(data.nkill);

    parcoords
    .data(data)
    .render()
    .brushMode("1D-axes");  // enable brushing
    
    // create data table, row hover highlighting
    var grid = d3.divgrid();
    d3.select("#grid")
    .datum(data.slice(0, 10))
    .call(grid)
    .selectAll(".row")
    .on({
        "mouseover": function (d) { parcoords.highlight([d]) },
        "mouseout": parcoords.unhighlight
    });
    
    // update data table on brush event
    parcoords.on("brush", function (d) {
        d3.select("#grid")
        .datum(d.slice(0, 10))
        .call(grid)
        .selectAll(".row")
        .on({
            "mouseover": function (d) { parcoords.highlight([d]) },
            "mouseout": parcoords.unhighlight
        });
    });
    
});
