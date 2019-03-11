// // // function maps() {
//     d3.csv("csv/terrorism-small.csv").then(function(data4){
//      var country_school = crossfilter(data4);
//      console.log(data4)

//      var countries = country_school.dimension(function (d) {
//       return d.country;
//     })
//      var country = countries.group();


//      var nations = country.all()
//      var array = []
//      nations.forEach(function (entry) {
//       array.push(entry.key)
//      })

//      d3.json("json/countries.geo.json").then(function (statesJson) {
//       worldChart.width(900)
//       .height(425)
//       .dimension(countries)
//       .group(country)
//       .colors(d3.scaleQuantize().range(d3.schemeReds[9]))
//       .colorDomain([0, 60])
//       .colorCalculator(function (d) { return d ? worldChart.colors()(d) : '#ccc'; })
//       .overlayGeoJson(statesJson.features, "name", function (d) {
//        return d.name;
//      })
//       .projection(d3.geoConicEqualArea())
//       .on('renderlet.a', function(chart) {
//        dc.events.trigger(function() {
//         worldChart.selectAll("svg").on("click", function () {
//           filter = worldChart.filters();
//           filter.forEach(function (elem){
//             if (array.indexOf(elem) == -1){
//                 filter.splice(filter.indexOf(elem),1)
//                 alert("No data for the selected country")
//                 worldChart.filterAll();dc.redrawAll();
//                 render('');

//               }
//             })
//           render(filter);
//         })
        
//       })
//      })
//       .legend(dc.legend().x(250).y(10))


//       dc.renderAll();
//     });



//    });
// //   }

