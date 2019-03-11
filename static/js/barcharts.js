// https://canvasjs.com/javascript-charts/stacked-bar-chart/
// https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/

// window.onload = function () {
//     var chart = new CanvasJS.Chart("chartContainer",
//     {
//       title:{
//       text: "Type of weapons in each region"
//       },

//       axisX: {
//         valueFormatString: "MMM",
//         interval: 1,
//         intervalType: "month"
//       },

//       data: [
//       {
//         type: "stackedBar",
//         legendText: "meals",
//         showInLegend: "true",
//         dataPoints: [
//         { x: new Date(2012, 01, 1), y: 71 },
//         { x: new Date(2012, 02, 1), y: 55},
//         { x: new Date(2012, 03, 1), y: 50 },
//         { x: new Date(2012, 04, 1), y: 65 },
//         { x: new Date(2012, 05, 1), y: 95 }

//         ]
//       },
//         {
//         type: "stackedBar",
//         legendText: "snacks",
//         showInLegend: "true",
//         dataPoints: [
//         { x: new Date(2012, 01, 1), y: 71 },
//         { x: new Date(2012, 02, 1), y: 55},
//         { x: new Date(2012, 03, 1), y: 50 },
//         { x: new Date(2012, 04, 1), y: 65 },
//         { x: new Date(2012, 05, 1), y: 95 }

//         ]
//       },
//         {
//         type: "stackedBar",
//         legendText: "drinks",
//         showInLegend: "true",
//         dataPoints: [
//         { x: new Date(2012, 01, 1), y: 71 },
//         { x: new Date(2012, 02, 1), y: 55},
//         { x: new Date(2012, 03, 1), y: 50 },
//         { x: new Date(2012, 04, 1), y: 65 },
//         { x: new Date(2012, 05, 1), y: 95 }

//         ]
//       },

//         {
//         type: "stackedBar",
//         legendText: "dessert",
//         showInLegend: "true",
//         dataPoints: [
//         { x: new Date(2012, 01, 1), y: 61 },
//         { x: new Date(2012, 02, 1), y: 75},
//         { x: new Date(2012, 03, 1), y: 80 },
//         { x: new Date(2012, 04, 1), y: 85 },
//         { x: new Date(2012, 05, 1), y: 105 }

//         ]
//       },
//         {
//         type: "stackedBar",
//         legendText: "takeaway",
//         showInLegend: "true",
//         dataPoints: [
//         { x: new Date(2012, 01, 1), y: 20 },
//         { x: new Date(2012, 02, 1), y: 35},
//         { x: new Date(2012, 03, 1), y: 30 },
//         { x: new Date(2012, 04, 1), y: 45 },
//         { x: new Date(2012, 05, 1), y: 25 }

//         ]
//       }

//       ]
//     });

//     chart.render();
//   }

function barchart() {
    
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        backgroundColor: "#0E0E0E",
        title:{
            // text: "Weapons",
            fontColor: "white",
            fontFamily: "sans-serif",
            fontSize: 18
        },
        axisX: {
            valueFormatString: "DDD",
            labelFontColor: "white"
        },
        axisY: {
            prefix: "$",
            labelFontColor: "white"
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer",
            fontColor: "white",
            itemclick: toggleDataSeries
        },
        data: [
            
            {
                type: "stackedBar",
                name: "meals",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 56 },
                    { x: new Date(2017, 0, 31), y: 45 },
                    { x: new Date(2017, 1, 1), y: 71 },
                    { x: new Date(2017, 1, 2), y: 41 },
                    { x: new Date(2017, 1, 3), y: 60 },
                    { x: new Date(2017, 1, 4), y: 75 },
                    { x: new Date(2017, 1, 5), y: 98 }
                ]
            },
            {
                type: "stackedBar",
                name: "Snacks",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 86 },
                    { x: new Date(2017, 0, 31), y: 95 },
                    { x: new Date(2017, 1, 1), y: 71 },
                    { x: new Date(2017, 1, 2), y: 58 },
                    { x: new Date(2017, 1, 3), y: 60 },
                    { x: new Date(2017, 1, 4), y: 65 },
                    { x: new Date(2017, 1, 5), y: 89 }
                ]
            },
            {
                type: "stackedBar",
                name: "Drinks",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 48 },
                    { x: new Date(2017, 0, 31), y: 45 },
                    { x: new Date(2017, 1, 1), y: 41 },
                    { x: new Date(2017, 1, 2), y: 55 },
                    { x: new Date(2017, 1, 3), y: 80 },
                    { x: new Date(2017, 1, 4), y: 85 },
                    { x: new Date(2017, 1, 5), y: 83 }
                ]
            },
            {
                type: "stackedBar",
                name: "Dessert",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 61 },
                    { x: new Date(2017, 0, 31), y: 55 },
                    { x: new Date(2017, 1, 1), y: 61 },
                    { x: new Date(2017, 1, 2), y: 75 },
                    { x: new Date(2017, 1, 3), y: 80 },
                    { x: new Date(2017, 1, 4), y: 85 },
                    { x: new Date(2017, 1, 5), y: 105 }
                ]
            },
            {
                type: "stackedBar",
                name: "Takeaway",
                showInLegend: "true",
                xValueFormatString: "DD, MMM",
                yValueFormatString: "$#,##0",
                dataPoints: [
                    { x: new Date(2017, 0, 30), y: 52 },
                    { x: new Date(2017, 0, 31), y: 55 },
                    { x: new Date(2017, 1, 1), y: 20 },
                    { x: new Date(2017, 1, 2), y: 35 },
                    { x: new Date(2017, 1, 3), y: 30 },
                    { x: new Date(2017, 1, 4), y: 45 },
                    { x: new Date(2017, 1, 5), y: 25 }
                ]
            }
        ]
    });
   
    chart.render();
    
    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
}