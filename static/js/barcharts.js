// https://canvasjs.com/javascript-charts/json-data-api-ajax-chart/
// https://canvasjs.com/docs/charts/chart-options/

var weapons_to_txt = {
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

// https://canvasjs.com/javascript-charts/json-data-api-ajax-chart/
// https://canvasjs.com/docs/charts/chart-options/

function barchart(filter_year = 0){
	
	// var svg = d3.select("#canvasjs-chart-container")
	// svg.selectAll("canvas").remove()
	// svg.selectAll("svg").remove()
	
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

function barchart_3(filter_year = 0){
	var dataPoints = []
	var data_1 = []
	var dataPoints_str = []

	var chart = new CanvasJS.Chart("chartContainer", {
		width: 600,
		animationEnabled: true,
		theme: "dark1",
		backgroundColor: "#0E0E0E",
		title: {
			text: "Victim for type of attack",
			fontColor: "white",
			fontFamily: "sans-serif",
			fontSize: 18
		},
		legend: {
			cursor:"pointer",
			horizontalAlign: "right", 
			verticalAlign: "bottom", 
			fontSize: 16
		},
		axisX: {
			labelFontColor: "white",
			interval: 1,
			labelFormatter: function ( e ) {
				if (e.value == 12) return "December"
				else if (e.value == 11) return "November"
				else if (e.value == 10) return "October"
				else if (e.value == 9) return "September"
				else if (e.value == 8) return "August"
				else if (e.value == 7) return "july"
				else if (e.value == 6) return "June"
				else if (e.value == 5) return "May"
				else if (e.value == 4) return "April"
				else if (e.value == 3) return "March"
				else if (e.value == 2) return "February"  
				else return "January"
			}  
		},
		axisY: {
			title: "Victim",
			interval: 800,
			titleFontSize: 24,
			labelFontColor: "white"
		},
		data: data_1
		// type: "column",
		// showInLegend: true,
		// xValueFormatString: "Month: 0#",
		// yValueFormatString: "### Victim",
		// dataPoints: dataPoints
	});
	
	function createData(data){
		// console.log(JSON.stringify(dataPoints))
		 for (var key in weapons_to_txt){
			//  console.log(dataPoints_str)
			for(elem in data){
				// console.log(data[elem]);
				
				if (key == data[elem].weaptype1 && key== parseInt(dataPoints.label)){
					data_1.push({
						type: "stackedBar",
						showInLegend: true,
						name: weapons_to_txt[key],
						xValueFormatString: "Month: 0#",
						yValueFormatString: "### Victim",
						dataPoints: dataPoints
					})
				}
			} 
		}
	}	
		
		//console.log(JSON.stringify(data_1[0]))
		// console.log(JSON.stringify(dataPoints))

		// let j = {
		// 	type: "stackedBar",
		// 	showInLegend: true,
		// 	name: "Explosives",
		// 	xValueFormatString: "Month: 0#",
		// 	yValueFormatString: "### Victim",
		// 	dataPoints: dataPoints
		// }
	
	function addData(data) {
		
		let cf = crossfilter(data)
		let byYear = cf.dimension(d => d.year)
		
		//Filter data
		if (filter_year != 0) {
			let f = byYear.filter(filter_year)
			data = f.top(Infinity)
		}

		for (var i = 0; i < data.length; i++){
			let d = data[i]
			dataPoints.push({
				y: parseInt(d.nkill),
				x: parseInt(d.imonth),
				label: d.weaptype1
			});
		}


		// console.log(JSON.stringify(dataPoints));
		dataPoints_str = JSON.stringify(dataPoints)
		createData(data)

		chart.render();
	}
	
	d3.csv('data/barchart_data.csv', addData)

}



// function barchart(filter_year = 0){

// 	// var svg = d3.select("#canvasjs-chart-container")
// 	// svg.selectAll("canvas").remove()
// 	// svg.selectAll("svg").remove()

// 		var dataPoints = [];

// 		var chart = new CanvasJS.Chart("chartContainer", {
// 			animationEnabled: true,
// 			theme: "dark1",
// 			backgroundColor: "#0E0E0E",
// 			// title: {
// 			// 	text: "Titolo del grafico",
// 			// 	fontColor: "white",
// 			// 	fontFamily: "sans-serif",
// 			// 	fontSize: 18
// 			// },
// 			axisX: {
// 				labelFontColor: "white",
// 				interval: 50,
// 				labelFormatter: function ( e ) {
// 					if (e.value == 0) return "no success"
// 					return "success";  
// 			  }  
// 			},
// 			axisY: {
// 				title: "Victim",
// 				interval: 1,
// 				titleFontSize: 18,
// 				labelFontColor: "white"
// 			},
// 			data: [{
// 				type: "bar",
// 				yValueFormatString: "### Victim",
// 				dataPoints: dataPoints
// 			}]
// 		});

// 		function addData(data) {

// 			if (filter_year != 0) {
// 				//Filter data
// 				let cf = crossfilter(data)
// 				let byYear = cf.dimension(d => d.year)
// 				let f = byYear.filter(filter_year)
// 				data = f.top(Infinity)
// 			}

// 			// console.log(JSON.stringify(data))
// 			for (var i = 0; i < data.length; i++) {
// 				let d = data[i]
// 				dataPoints.push({
// 					x: parseInt(d.success),
// 					y: parseInt(d.nkill)
// 				});
// 			}
// 			chart.render();
// 		}

// 		d3.csv('data/terrorism.csv', addData)	
// }

// function barchart_3(filter_year = 0){
// 	var dataPoints = []

// 	var chart = new CanvasJS.Chart("chartContainer", {
// 		width: 600,
// 		animationEnabled: true,
// 		theme: "dark1",
// 		backgroundColor: "#0E0E0E",
// 		title: {
// 			text: "Victim for type of attack",
// 			fontColor: "white",
// 			fontFamily: "sans-serif",
// 			fontSize: 18
// 		},
// 		legend: {
// 			cursor:"pointer",
// 			horizontalAlign: "right", 
// 			verticalAlign: "bottom", 
// 			fontSize: 16
// 		},
// 		axisX: {
// 			labelFontColor: "white",
// 			interval: 1,
// 			labelFormatter: function ( e ) {
// 				if (e.value == 12) return "December"
// 				else if (e.value == 11) return "November"
// 				else if (e.value == 10) return "October"
// 				else if (e.value == 9) return "September"
// 				else if (e.value == 8) return "August"
// 				else if (e.value == 7) return "july"
// 				else if (e.value == 6) return "June"
// 				else if (e.value == 5) return "May"
// 				else if (e.value == 4) return "April"
// 				else if (e.value == 3) return "March"
// 				else if (e.value == 2) return "February"  
// 				else return "January"
// 		  }  
// 		},
// 		axisY: {
// 			title: "Victim",
// 			interval: 75,
// 			titleFontSize: 24,
// 			labelFontColor: "white"
// 		},
// 		data: [{
// 			type: "column",
// 			showInLegend: true,
// 			xValueFormatString: "Month: 0#",
// 			yValueFormatString: "### Victim",
// 			dataPoints: dataPoints
// 		}]
// 	});

// 	function createData(data){
// 		for (var i = 0; i < data.length; i++){
// 			let d = data[i]
// 			data: [{
// 				type: "column",
// 				showInLegend: true,
// 				xValueFormatString: "Month: 0#",
// 				yValueFormatString: "### Victim",
// 				dataPoints: dataPoints
// 			}]
// 	}

// 	function addData(data) {

// 		if (filter_year != 0) {
// 			//Filter data
// 			let cf = crossfilter(data)
// 			let byYear = cf.dimension(d => d.year)
// 			let f = byYear.filter(filter_year)
// 			data = f.top(Infinity)
// 		}

// 		for (var i = 0; i < data.length; i++){
// 			let d = data[i]
// 			console.log(d)
// 			dataPoints.push({
// 				y: parseInt(d.nkill),
// 				x: parseInt(d.imonth)
// 			});
// 		}
// 		chart.render();
// 	}

// 		d3.csv('data/terrorism.csv', addData)	
// }


// // yAxes: [
// //     {
// //       ticks: {
// //         min: 0,
// //         max: this.max,// Your absolute max value
// //         callback: function (value) {
// //           return (value / this.max * 100).toFixed(0) + '%'; // convert it to percentage
// //         },
// //       },
// //       scaleLabel: {
// //         display: true,
// //         labelString: 'Percentage',
// //       },
// //     },
// //   ],
// // },


// function barchart2() {

// 	var chart = new CanvasJS.Chart("chartContainer", {
// 		animationEnabled: true,
// 		backgroundColor: "#0E0E0E",
// 		title: {
// 			// text: "Weapons",
// 			fontColor: "white",
// 			fontFamily: "sans-serif",
// 			fontSize: 18
// 		},
// 		axisX: {
// 			valueFormatString: "DDD",
// 			labelFontColor: "white"
// 		},
// 		axisY: {
// 			prefix: "$",
// 			labelFontColor: "white"
// 		},
// 		toolTip: {
// 			shared: true
// 		},
// 		legend: {
// 			cursor: "pointer",
// 			fontColor: "white",
// 			itemclick: toggleDataSeries
// 		},
// 		data: [

// 			{
// 				type: "stackedBar",
// 				name: "meals",
// 				showInLegend: "true",
// 				xValueFormatString: "DD, MMM",
// 				yValueFormatString: "$#,##0",
// 				dataPoints: [
// 					{ x: new Date(2017, 0, 30), y: 56 },
// 					{ x: new Date(2017, 0, 31), y: 45 },
// 					{ x: new Date(2017, 1, 1), y: 71 },
// 					{ x: new Date(2017, 1, 2), y: 41 },
// 					{ x: new Date(2017, 1, 3), y: 60 },
// 					{ x: new Date(2017, 1, 4), y: 75 },
// 					{ x: new Date(2017, 1, 5), y: 98 }
// 				]
// 			},
// 			{
// 				type: "stackedBar",
// 				name: "Snacks",
// 				showInLegend: "true",
// 				xValueFormatString: "DD, MMM",
// 				yValueFormatString: "$#,##0",
// 				dataPoints: [
// 					{ x: new Date(2017, 0, 30), y: 86 },
// 					{ x: new Date(2017, 0, 31), y: 95 },
// 					{ x: new Date(2017, 1, 1), y: 71 },
// 					{ x: new Date(2017, 1, 2), y: 58 },
// 					{ x: new Date(2017, 1, 3), y: 60 },
// 					{ x: new Date(2017, 1, 4), y: 65 },
// 					{ x: new Date(2017, 1, 5), y: 89 }
// 				]
// 			},
// 			{
// 				type: "stackedBar",
// 				name: "Drinks",
// 				showInLegend: "true",
// 				xValueFormatString: "DD, MMM",
// 				yValueFormatString: "$#,##0",
// 				dataPoints: [
// 					{ x: new Date(2017, 0, 30), y: 48 },
// 					{ x: new Date(2017, 0, 31), y: 45 },
// 					{ x: new Date(2017, 1, 1), y: 41 },
// 					{ x: new Date(2017, 1, 2), y: 55 },
// 					{ x: new Date(2017, 1, 3), y: 80 },
// 					{ x: new Date(2017, 1, 4), y: 85 },
// 					{ x: new Date(2017, 1, 5), y: 83 }
// 				]
// 			},
// 			{
// 				type: "stackedBar",
// 				name: "Dessert",
// 				showInLegend: "true",
// 				xValueFormatString: "DD, MMM",
// 				yValueFormatString: "$#,##0",
// 				dataPoints: [
// 					{ x: new Date(2017, 0, 30), y: 61 },
// 					{ x: new Date(2017, 0, 31), y: 55 },
// 					{ x: new Date(2017, 1, 1), y: 61 },
// 					{ x: new Date(2017, 1, 2), y: 75 },
// 					{ x: new Date(2017, 1, 3), y: 80 },
// 					{ x: new Date(2017, 1, 4), y: 85 },
// 					{ x: new Date(2017, 1, 5), y: 105 }
// 				]
// 			},
// 			{
// 				type: "stackedBar",
// 				name: "Takeaway",
// 				showInLegend: "true",
// 				xValueFormatString: "DD, MMM",
// 				yValueFormatString: "$#,##0",
// 				dataPoints: [
// 					{ x: new Date(2017, 0, 30), y: 52 },
// 					{ x: new Date(2017, 0, 31), y: 55 },
// 					{ x: new Date(2017, 1, 1), y: 20 },
// 					{ x: new Date(2017, 1, 2), y: 35 },
// 					{ x: new Date(2017, 1, 3), y: 30 },
// 					{ x: new Date(2017, 1, 4), y: 45 },
// 					{ x: new Date(2017, 1, 5), y: 25 }
// 				]
// 			}
// 		]
// 	});

// 	chart.render();

// 	function toggleDataSeries(e) {
// 		if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
// 			e.dataSeries.visible = false;
// 		}
// 		else {
// 			e.dataSeries.visible = true;
// 		}
// 		chart.render();
// 	}
// }