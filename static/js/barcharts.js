let weapons_to_txt = {
    1: "Biological",
    2: "Chemical",
    3: "Radiological",
    5: "Firearms",
    6: "Explosives",
    7: "Fake Weapons",
    8: "Incendiary",
    9: "Melee",
    10: "Vehicle bombs",
    11: "Sabotage Equipment",
    12: "Other",
    13: "Unknown"
}

var selectedWeapType = []

function barchart() {
    d3.csv('data/barchart_data.csv', (data) => {

        var inputData = [];
        data.forEach(function (d, i) {
            inputData.push({
                label          : d.imonth + ',' + d.country_txt + ',' + d.year,
                "Firearms"     : d.weaptype1 == 5 ? parseInt(d.nkill)         : 0,
                "Radiological" : d.weaptype1 == 3 ? parseInt(d.nkill)         : 0,
                "Explosives"   : d.weaptype1 == 6 ? parseInt(d.nkill)         : 0,
                "Fake Weapons" : d.weaptype1 == 7 ? parseInt(d.nkill)         : 0,
                "Incendiary"   : d.weaptype1 == 8 ? parseInt(d.nkill)         : 0,
                "Chemical"     : d.weaptype1 == 2 ? parseInt(d.nkill)         : 0,
                "Vehicle bombs": d.weaptype1 == 10 ? parseInt(d.nkill)        : 0,
                "Melee"        : d.weaptype1 == 9 ? parseInt(d.nkill)         : 0,
                "Biological"   : d.weaptype1 == 1 ? parseInt(d.nkill)         : 0,
                "Sabotage Equipment" : d.weaptype1 == 11 ? parseInt(d.nkill)         : 0,
                "Other"        : d.weaptype1 == 12 ? parseInt(d.nkill)        : 0,
                "Unknown"      : d.weaptype1 == 13 ? parseInt(d.nkill)        : 0,

            })
        })
        renderStackedBarChart(inputData);
    })
}
//http://bl.ocks.org/arpitnarechania/6616c93c74840d87de839aab44aba77f
function renderStackedBarChart(inputData) {
    data = inputData

    let dom_element_to_append_to = "#chart"
    let colorScheme = ['#f0ffff','#dae0f1','#c2c2e1','#a9a6d1','#8f8bc0','#7272ae','#7cf3d0','#77dbc6','#70c5bd','#69adb2','#6098a8','#008b8b'].reverse()
    // remove graph
    var svg = d3.select("#chart")
    svg.selectAll("canvas").remove()
    svg.selectAll("svg").remove()

    var margin = { top: 20, right: 120, bottom: 30, left: 40 },
        // width = 350 - margin.left - margin.right,
        // height = 350 - margin.top - margin.bottom,
        width = 280,
        height = 380
    height2 = height * 0.75;

    //legend position on x axis
    let legend_rect_x_axis = width + 50

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .rangeRound([height2, 0]);

    var color = d3.scale.ordinal()
        .range(colorScheme);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(
            function (d) {
                // return (new Date(+d) + "").substring(3, 16);
                return d
            }
        );

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (d) {
            // console.log(d)
            let n_victims = (d.y1 - d.y0).toFixed(0)
            var s = "<div> <strong>" + d.name + ": <span style='color:white'>" + n_victims + " victims </span></br>Year: " + d.myYear + "</div>"
            if (d.myCountry != "undefined" && d.myYear != "undefined") { //sono selezionati country e year
                s = "<div> <strong>" + d.name + ": <span style='color:white'>" + n_victims + " victims </span></br>Year: " + d.myYear + "</br>Country: " + d.myCountry + "</div>"
            }
            else if (d.myCountry == "undefined" && d.myYear == "undefined") {
                s = "<div> <strong>" + d.name + ": <span style='color:white'>" + n_victims + " victims </span></div>"
            }
            else if (d.myCountry != "undefined" && d.myYear == "undefined") { //viene selezionata la country e non l'anno. Sommo vittime di tutte le country per tutti gli anni
                s = "<div> <strong>" + d.name + ": <span style='color:white'>" + n_victims + " victims </span></br>Country: " + d.myCountry + "</div>"
            }
            return s
        })

    var svg = d3.select(dom_element_to_append_to).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var main = svg.append("g")
        .attr("height", height2)
        .attr("transform", "translate(" + margin.left + "," + (height * 0.20) + ")");

    var active_link = "0";
    var legendClicked;
    var legendClassArray = [];
    var y_orig;

    svg.call(tip);

    color.domain(d3.keys(data[0]).filter(function (key) { return key !== "label"; }));

    data.forEach(function (d) {
        let labelSplit = d.label.split(',')
        var mylabel = labelSplit[0]
        var myCountry = labelSplit[1]
        var myYear = labelSplit[2]

        // var mycountry = d.country_txt
        // if (d.hasOwnProperty("country_txt")){
        //     mycountry = d.country_txt
        // } 
        var y0 = 0;

        d.params = color.domain().map(function (name) {
            return {
                mylabel: mylabel,
                name: name,
                y0: y0,
                y1: y0 += +d[name],
                myCountry: myCountry,
                myYear: myYear
            }
        });

        d.total = d.params[d.params.length - 1].y1;

        // console.log(d.myCountry);

    });

    data.sort(function (a, b) { return b.total - a.total; });

    x.domain(
        // data.map( function (d) { return (d.label); } )
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    );

    y.domain(
        [0, d3.max(data, function (d) { return d.total; })]
    );

    main.append("g")
        .attr("class", "x axis")
        .attr("class", "x axis barchart")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis)
        .append("text")
        .attr("x", 340)
        .attr("y", 7)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Month")

    main.append("g")
        .attr("class", "y axis")
        .attr("class", "y axis barchart")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", 50)
        .attr("y", -15)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Victims");

    var state = main.selectAll(".state")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) { return "translate(" + "0" + ",0)"; });

    state.selectAll("rect")
        .data(function (d) {
            return d.params;
        })
        .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d.y1); })
        .attr("x", function (d) {
            return x(d.mylabel)
        })
        .attr("height", function (d) { return y(d.y0) - y(d.y1); })
        .attr("class", function (d) {
            var classLabel = d.name.replace(/\s/g, '');
            return "class" + classLabel;
        })
        .style("fill", function (d) { return color(d.name); })
    // .attr("stroke", "black")
    // .attr("stroke-width", "2")

    state.selectAll("rect")
        .on("mouseover", function (d) {

            var delta = d.y1 - d.y0;
            var xPos = parseFloat(d3.select(this).attr("x"));
            var yPos = parseFloat(d3.select(this).attr("y"));
            var height = parseFloat(d3.select(this).attr("height"))

            // d3.select(this).attr("stroke", "black").attr("stroke-width", 0.8);
            d3.select(this).style("fill", "#F4C94E")

            tip.show(d);

        })
        .on("mouseout", function (d) {
            tip.hide(d);
            d3.select(this).style("fill", function (d) { return color(d.name); })

        })
        .on("click", function (d) {
            let weapType = d.name
            selectedWeapType.push(weapType)
            updateCharts(csv = 'terrorism.csv', weapType = selectedWeapType)
            $('#world-map-region-trigger').click() // to update scatterplot PCA

            tip.hide(d);

        })


    var legend = svg.selectAll(".legend")
        .data(color.domain().slice().reverse())
        .enter().append("g")
        .attr("class", function (d) {
            legendClassArray.push(d.replace(/\s/g, ''));
            return "legend";
        })
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });


    legendClassArray = legendClassArray.reverse();

    legend.append("rect")
        .attr("x", legend_rect_x_axis)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color)
        .attr("id", function (d, i) {
            return "id" + d.replace(/\s/g, '');
        })
        .on("mouseover", function () {

            if (active_link === "0") d3.select(this).style("cursor", "pointer");
            else {
                if (active_link.split("class").pop() === this.id.split("id").pop()) {
                    d3.select(this).style("cursor", "pointer");
                } else d3.select(this).style("cursor", "auto");
            }
        })
        .on("click", function (d) {

            if (active_link === "0") {
                d3.select(this)
                // .style("stroke", "black")
                // .style("stroke-width", 2);

                active_link = this.id.split("id").pop();
                plotSingle(this);


                for (i = 0; i < legendClassArray.length; i++) {
                    if (legendClassArray[i] != active_link) {
                        d3.select("#id" + legendClassArray[i])
                            .style("opacity", 0.5);
                    }
                }

            }
            else {
                if (active_link === this.id.split("id").pop()) {
                    d3.select(this)
                        .style("stroke", "none");

                    active_link = "0";


                    for (i = 0; i < legendClassArray.length; i++) {
                        d3.select("#id" + legendClassArray[i])
                            .style("opacity", 1);
                    }

                    restorePlot(d);

                }

            }
        });

    legend.append("text")
        .attr("x", legend_rect_x_axis + 25)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d) { return d; });

    function restorePlot(d) {

        state.selectAll("rect").forEach(function (d, i) {

            d3.select(d[idx])
                .transition()
                .duration(1000)
                .attr("y", y_orig[i]);
        })


        for (i = 0; i < legendClassArray.length; i++) {
            if (legendClassArray[i] != class_keep) {
                d3.selectAll(".class" + legendClassArray[i])
                    .transition()
                    .duration(1000)
                    .delay(750)
                    .style("opacity", 1);
            }
        }

    }

    function plotSingle(d) {

        class_keep = d.id.split("id").pop();
        idx = legendClassArray.indexOf(class_keep);


        for (i = 0; i < legendClassArray.length; i++) {
            if (legendClassArray[i] != class_keep) {
                d3.selectAll(".class" + legendClassArray[i])
                    .transition()
                    .duration(1000)
                    .style("opacity", 0);
            }
        }


        y_orig = [];
        state.selectAll("rect").forEach(function (d, i) {


            h_keep = d3.select(d[idx]).attr("height");
            y_keep = d3.select(d[idx]).attr("y");

            y_orig.push(y_keep);

            h_base = d3.select(d[0]).attr("height");
            y_base = d3.select(d[0]).attr("y");

            h_shift = h_keep - h_base;
            y_new = y_base - h_shift;


            d3.select(d[idx])
                .transition()
                .ease("bounce")
                .duration(1000)
                .delay(750)
                .attr("y", y_new);

        })

    }
};