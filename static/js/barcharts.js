// https://canvasjs.com/javascript-charts/json-data-api-ajax-chart/
// https://canvasjs.com/docs/charts/chart-options/

function barchart(filter_year = 0){

		var dataPoints = [];
		
		var chart = new CanvasJS.Chart("chartContainer", {
			animationEnabled: true,
			theme: "dark1",
			backgroundColor: "#0E0E0E",
			// title: {
			// 	text: "Titolo del grafico",
			// 	fontColor: "white",
			// 	fontFamily: "sans-serif",
			// 	fontSize: 18
			// },
			axisX: {
				labelFontColor: "white",
				interval: 50,
				labelFormatter: function ( e ) {
					if (e.value == 0) return "no success"
					return "success";  
			  }  
			},
			axisY: {
				title: "Victim",
				interval: 1,
				titleFontSize: 18,
				labelFontColor: "white"
			},
			data: [{
				type: "bar",
				yValueFormatString: "### Victim",
				dataPoints: dataPoints
			}]
		});
		
		function addData(data) {
			
			if (filter_year != 0) {
				//Filter data
				let cf = crossfilter(data)
				let byYear = cf.dimension(d => d.year)
				let f = byYear.filter(filter_year)
				data = f.top(Infinity)
			}

			// console.log(JSON.stringify(data))
			for (var i = 0; i < data.length; i++) {
				let d = data[i]
				dataPoints.push({
					x: parseInt(d.success),
					y: parseInt(d.nkill)
				});
			}
			chart.render();
		}

		d3.csv('data/terrorism.csv', addData)	
}

function barchart_3(){
	var dataPoints = [];

	var chart = new CanvasJS.Chart("chartContainer", {
		width: 320,
		animationEnabled: true,
		theme: "dark1",
		backgroundColor: "#0E0E0E",
		title: {
			text: "Victim for type of attack",
			fontColor: "white",
			fontFamily: "sans-serif",
			fontSize: 18
		},
		axisX: {
			labelFontColor: "white",
			interval: 1,
			labelFormatter: function ( e ) {
				if (e.value == 12) return "other"
				else if (e.value == 10) return "no Vehicle"
				else if (e.value == 9) return "no Melee"
				else if (e.value == 8) return "Incendiary"
				else if (e.value == 7) return "Fake Weapons"
				else if (e.value == 6) return "Explosives"
				else if (e.value == 5) return "Firearms"
				else if (e.value == 3) return "Radiological"
				else if (e.value == 2) return "Chemical"  
				//return "Unknown"
		  }  
		},
		axisY: {
			title: "Victim",
			interval: 100,
			titleFontSize: 24,
			labelFontColor: "white"
		},
		data: [{
			type: "bar",
			xValueFormatString: "Type: ####",
			yValueFormatString: "### Victim",
			dataPoints: dataPoints
		}]
	});

	function addData(data) {
		for (var i = 0; i < data.length; i++){
			let d = data[i]
			dataPoints.push({
				y: parseInt(d.nkill),
				x: parseInt(d.weaptype1)
			});
		}
		chart.render();
	}

		d3.csv('data/terrorism.csv', addData)	
}


// yAxes: [
//     {
//       ticks: {
//         min: 0,
//         max: this.max,// Your absolute max value
//         callback: function (value) {
//           return (value / this.max * 100).toFixed(0) + '%'; // convert it to percentage
//         },
//       },
//       scaleLabel: {
//         display: true,
//         labelString: 'Percentage',
//       },
//     },
//   ],
// },


function barchart2() {

	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		backgroundColor: "#0E0E0E",
		title: {
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
		legend: {
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
		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		chart.render();
	}
}