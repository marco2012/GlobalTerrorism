let weapons_to_txt = {
    2: "Chemical",
    3: "Radiological",
    5: "Firearms",
    6: "Explosives",
    7: "Fake Weapons",
    8: "Incendiary",
    9: "Melee",
    10: "Vehicle bombs",
    12: "Other",
    13: "Unknown"
}

var w = 800,
h = 400,
padding = 40;

var dataset = [
    { apples: 5,  oranges: 10, grapes: 22 },
    { apples: 4,  oranges: 12, grapes: 28 },
    { apples: 2,  oranges: 19, grapes: 32 },
    { apples: 7,  oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 },
];

var fruits = Object.keys(dataset[0]);

var colors = d3v4.scaleOrdinal(d3v4.schemeCategory10);

var xScale = d3v4.scaleBand()
.domain(d3v4.range(dataset.length))
.range([padding, w - padding])
.paddingInner(0.05);

var yScale = d3v4.scaleLinear()
.domain([0, d3v4.max(dataset, function(d) {
    var total = 0;
    for (var i = 0; i < fruits.length; i++) {
        total += d[fruits[i]];
    }
    return total;
})])
.range([h - padding, 0]);

var yAxis = d3v4.axisLeft()
.scale(yScale)
.ticks(6);

var stack = d3v4.stack()
.keys(fruits)
.order(d3v4.stackOrderDescending);

var series = stack(dataset);

var svg = d3v4.select('svg')
.attr('width', w)
.attr('height', h)

var groups = svg.selectAll('g')
.data(series)
.enter()
.append('g')
.style('fill', function(d, i){
    return colors(i);
});

var rects = groups.selectAll('rect')
.data(function(d){return d;})
.enter()
.append('rect')
.attr('x', function(d, i){
    return xScale(i);
})
.attr('y', function(d){
    return yScale(d[1]);
})
.attr('height', function(d) {
    return yScale(d[0]) - yScale(d[1]);
})
.attr('width', xScale.bandwidth());

svg.append('g')
.attr('class', 'y axis')
.attr('transform', 'translate(' + padding + ', 0)')
.call(yAxis);

var legend = svg.append('g')
.attr('class', 'legend')
.attr('transform', 'translate(' + (padding + 12) + ', 0)');

legend.selectAll('rect')
.data(fruits)
.enter()
.append('rect')
.attr('x', 0)
.attr('y', function(d, i){
    return i * 18;
})
.attr('width', 12)
.attr('height', 12)
.attr('fill', function(d, i){
    return colors(i);
});

legend.selectAll('text')
.data(fruits)
.enter()
.append('text')
.text(function(d){
    return d;
})
.attr('x', 18)
.attr('y', function(d, i){
    return i * 18;
})
.attr('text-anchor', 'start')
.attr('alignment-baseline', 'hanging');





// non funziona un cazzo
// function barchart_3() {

//     // console.log(weapons_to_txt);

//     var dataArray = []
//     d3.csv("data/barchart_data.csv", (data) => {
//         // console.log(JSON.stringify(data));

//         //create array of available weaptypes
//         var availableWeapons = []
//         for (var i = 2; i <= 13; i++) {
//             console.log(parseInt(data[i].weaptype1))

//             if ((parseInt(data[i].weaptype1) == i) ) {
//                 console.log(i);
//                 availableWeapons.push(i)
//             }
//         }
//         console.log(availableWeapons);


//         for (var i=2; i<=13; i++){
//             if (parseInt(data[i].weaptype1)==i){
//                 var j = {
//                     type: "stackedBar",
//                     name: weapons_to_txt[5],
//                     showInLegend: "true",
//                     dataPoints: createDataPoints(data, 5)
//                 }
//                 dataArray.push(j)
//             }
//         }

//         // console.log(dataArray);

//         // console.log(JSON.stringify(dataArray))
//         // console.log(dataArray.length);

//         // chart.render();
//     })

//     function createDataPoints(data, weapon_number) {
//         var dataPoints = []
//         for (var i = 0; i < data.length; i++) {
//             if (parseInt(data[i].weaptype1) == weapon_number) {
//                 dataPoints.push({
//                     x: parseInt(data[i].nkill),
//                     y: parseInt(data[i].imonth)
//                 })
//             }
//         }
//         return dataPoints
//     }

//     var chart = new CanvasJS.Chart("chartContainer", {

//         animationEnabled: true,
//         title:{
//             text: "Evening Sales in a Restaurant"
//         },
//         axisX: {
//             valueFormatString: "DDD"
//         },
//         axisY: {
//             prefix: "$"
//         },
//         toolTip: {
//             shared: true
//         },
//         legend:{
//             cursor: "pointer",
//             itemclick: toggleDataSeries
//         },

//         data: JSON.parse(JSON.stringify(dataArray))
//         //     [

//         //         {
//         //         type: "stackedBar",
//         //         name: "Meals",
//         //         showInLegend: "true",
//         //         xValueFormatString: "DD, MMM",
//         //         yValueFormatString: "$#,##0",
//         //         dataPoints: [
//         //             {x: new Date(2017, 0, 30), y: 56 },
//         //             {x: new Date(2017, 0, 31), y: 45 },
//         //             {x: new Date(2017, 1, 1), y: 71 },
//         //             {x: new Date(2017, 1, 2), y: 41 },
//         //             {x: new Date(2017, 1, 3), y: 60 },
//         //             {x: new Date(2017, 1, 4), y: 75 },
//         //             {x: new Date(2017, 1, 5), y: 98 }
//         //         ]
//         //     },
//         //     {
//         //         type: "stackedBar",
//         //         name: "Snacks",
//         //         showInLegend: "true",
//         //         xValueFormatString: "DD, MMM",
//         //         yValueFormatString: "$#,##0",
//         //         dataPoints: [
//         //             {x: new Date(2017, 0, 30), y: 86 },
//         //             {x: new Date(2017, 0, 31), y: 95 },
//         //             {x: new Date(2017, 1, 1), y: 71 },
//         //             {x: new Date(2017, 1, 2), y: 58 },
//         //             {x: new Date(2017, 1, 3), y: 60 },
//         //             {x: new Date(2017, 1, 4), y: 65 },
//         //             {x: new Date(2017, 1, 5), y: 89 }
//         //         ]
//         //     },
//         //     {
//         //         type: "stackedBar",
//         //         name: "Drinks",
//         //         showInLegend: "true",
//         //         xValueFormatString: "DD, MMM",
//         //         yValueFormatString: "$#,##0",
//         //         dataPoints: [
//         //             {x: new Date(2017, 0, 30), y: 48 },
//         //             {x: new Date(2017, 0, 31), y: 45 },
//         //             {x: new Date(2017, 1, 1), y: 41 },
//         //             {x: new Date(2017, 1, 2), y: 55 },
//         //             {x: new Date(2017, 1, 3), y: 80 },
//         //             {x: new Date(2017, 1, 4), y: 85 },
//         //             {x: new Date(2017, 1, 5), y: 83 }
//         //         ]
//         //     },
//         //     {
//         //         type: "stackedBar",
//         //         name: "Dessert",
//         //         showInLegend: "true",
//         //         xValueFormatString: "DD, MMM",
//         //         yValueFormatString: "$#,##0",
//         //         dataPoints: [
//         //             {x: new Date(2017, 0, 30), y: 61 },
//         //             {x: new Date(2017, 0, 31), y: 55 },
//         //             {x: new Date(2017, 1, 1), y: 61 },
//         //             {x: new Date(2017, 1, 2), y: 75 },
//         //             {x: new Date(2017, 1, 3), y: 80 },
//         //             {x: new Date(2017, 1, 4), y: 85 },
//         //             {x: new Date(2017, 1, 5), y: 105 }
//         //         ]
//         //     },
//         //     {
//         //         type: "stackedBar",
//         //         name: "Takeaway",
//         //         showInLegend: "true",
//         //         xValueFormatString: "DD, MMM",
//         //         yValueFormatString: "$#,##0",
//         //         dataPoints: [
//         //             {x: new Date(2017, 0, 30), y: 52 },
//         //             {x: new Date(2017, 0, 31), y: 55 },
//         //             {x: new Date(2017, 1, 1), y: 20 },
//         //             {x: new Date(2017, 1, 2), y: 35 },
//         //             {x: new Date(2017, 1, 3), y: 30 },
//         //             {x: new Date(2017, 1, 4), y: 45 },
//         //             {x: new Date(2017, 1, 5), y: 25 }
//         //         ]
//         //     }
//         // ]

//     });

//     chart.render();

//     function toggleDataSeries(e) {
//         if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
//             e.dataSeries.visible = false;
//         }
//         else {
//             e.dataSeries.visible = true;
//         }
//         chart.render();
//     }

// }