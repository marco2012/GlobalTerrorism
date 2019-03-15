function drawParallel(filter_year=0, country=[]) {
    
    max_rows_to_take = 12
    db_name = 'terrorism.csv'
    
    //remove graph
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

    d3.csv('data/' + db_name)
    .row(function (d) { 
        return { //filter columns
            year           : d.year,
            nperps         : d.nperps,
            nkill          : d.nkill,
            nwound         : d.nwound,
            region_txt     : d.region_txt,
            suicide        : d.suicide,
            attacktype1_txt: d.attacktype1_txt,
            country_txt: d.country_txt,
            summary        : d.summary
        };
    })
    .get(function (e, data) {

        //Filter rows
        let cf = crossfilter(data)

        // filter years
        if (filter_year != 0){
            let byYear = cf.dimension(d => d.year)
            let f      = byYear.filter(filter_year)
            data       = f.top(Infinity)
        }

        //filter countries
        if (typeof country !== 'undefined' && country.length > 0){
            let byCountry = cf.dimension(d => d.country_txt)
            
            function multivalue_filter(values) {
                return function (v) {
                    return values.indexOf(v) !== -1;
                };
            }
            let f = byCountry.filterFunction(multivalue_filter(country));
            data = f.top(Infinity)
            // console.log(data)
        }

        // sort by nkill descend
        data.sort(function (a, b) {
            return b.nkill - a.nkill
        });

        parcoords
        .data(data)
        .hideAxis(["summary"])  //CONTROLLARE
        .render()
        .reorderable()
        .brushMode("1D-axes")  // enable brushing
        
        // create data table, row hover highlighting
        var grid = d3.divgrid();
        d3
        .select("#grid")
        .datum(data.slice(0, max_rows_to_take))
        .call(grid)
        .selectAll(".row")
        .on({
            "mouseover": function (d) { parcoords.highlight([d]) },
            "mouseout": parcoords.unhighlight,
            "click": function (d) { 
                document.getElementById('id01').style.display = 'block' //make block appear
                $('#dialog_title_span').html('<h2>Attack summary</h2>')
                $('#dialog_content_span').html("<br/>" + d.summary + "<br/><br/>")
            }
        });
        
        d3.selectAll(".col-8").remove() //rimuovo colonna summary
        
        // update data table on brush event
        parcoords.on("brush", function (d) {
            d3
            .select("#grid")
            .datum(d.slice(0, 10))
            .call(grid)
            .selectAll(".row")
            .on({
                "mouseover": function (d) { parcoords.highlight([d]) },
                "mouseout": parcoords.unhighlight,
                "click": function (d) {
                    document.getElementById('id01').style.display = 'block' //make block appear
                    $('#dialog_title_span').html('<h2>Attack summary</h2>')
                    $('#dialog_content_span').html("<br/>" + d.summary + "<br/><br/>")
                }
            });
            
            d3.selectAll(".col-8").remove() //rimuovo colonna summary
            
        });
        
    });
}
