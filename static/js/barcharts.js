function barchart(){
    window.onload = function() {

        var dataPoints = [];
        
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Daily Sales Data"
            },
            axisY: {
                title: "percentage",
                titleFontSize: 24
            },
            data: [{
                type: "column",
                yValueFormatString: "### Units",
                dataPoints: dataPoints
            }]
        });
        
        function addData(data) {
            for (var i = 0; i < data.length; i++) {
                dataPoints.push({
                    x: 33,
                    y: 23
                });
            }
            chart.render();
        
        }
		$.getJSON("https://canvasjs.com/data/gallery/javascript/daily-sales-data.json", addData);
		
        }
}