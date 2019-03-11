window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
      title:{
      text: "Type of weapons in each region"
      },

      axisX: {
        valueFormatString: "MMM",
        interval: 1,
        intervalType: "month"
      },

      data: [
      {
        type: "stackedBar",
        legendText: "meals",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 71 },
        { x: new Date(2012, 02, 1), y: 55},
        { x: new Date(2012, 03, 1), y: 50 },
        { x: new Date(2012, 04, 1), y: 65 },
        { x: new Date(2012, 05, 1), y: 95 }

        ]
      },
        {
        type: "stackedBar",
        legendText: "snacks",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 71 },
        { x: new Date(2012, 02, 1), y: 55},
        { x: new Date(2012, 03, 1), y: 50 },
        { x: new Date(2012, 04, 1), y: 65 },
        { x: new Date(2012, 05, 1), y: 95 }

        ]
      },
        {
        type: "stackedBar",
        legendText: "drinks",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 71 },
        { x: new Date(2012, 02, 1), y: 55},
        { x: new Date(2012, 03, 1), y: 50 },
        { x: new Date(2012, 04, 1), y: 65 },
        { x: new Date(2012, 05, 1), y: 95 }

        ]
      },

        {
        type: "stackedBar",
        legendText: "dessert",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 61 },
        { x: new Date(2012, 02, 1), y: 75},
        { x: new Date(2012, 03, 1), y: 80 },
        { x: new Date(2012, 04, 1), y: 85 },
        { x: new Date(2012, 05, 1), y: 105 }

        ]
      },
        {
        type: "stackedBar",
        legendText: "takeaway",
        showInLegend: "true",
        dataPoints: [
        { x: new Date(2012, 01, 1), y: 20 },
        { x: new Date(2012, 02, 1), y: 35},
        { x: new Date(2012, 03, 1), y: 30 },
        { x: new Date(2012, 04, 1), y: 45 },
        { x: new Date(2012, 05, 1), y: 25 }

        ]
      }

      ]
    });

    chart.render();
  }