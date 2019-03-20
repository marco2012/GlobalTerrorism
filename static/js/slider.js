// https://stackoverflow.com/questions/42864790/sliders-work-in-d3-js-v3-but-not-in-v4

var selectedSliderYear = 0
let min = 1975
let max = 2017
let step = 5
let tickFormatter = d3.format(".0f")
let tickValues = d3.range(min, max + 1, step)

//build step values based on years in dataset
var stepValues = []
d3v4.csv("data/terrorism.csv", function (data4) {
    let cf = crossfilter(data4);
    var countries = cf.dimension(function (d) {
        return d.year;
    })
    var country = countries.group();
    var nations = country.all()
    nations.forEach(function (entry) {
        stepValues.push(entry.key)
    })
})

function slider(initialValue=0) {
    //remove slider
    var svg = d3.select("#swift2Slider")
    svg.selectAll("canvas").remove()
    svg.selectAll("svg").remove()
    
    // create slider
    var slider = d3.slider()
        .min(min)
        .max(max)
        .showRange(true)
        .value(initialValue)
        .tickFormat(tickFormatter)
        .tickValues(tickValues)
        .stepValues(stepValues)
        .callback(function (evt) {
            selectedSliderYear = slider.value()
        });

    d3.select("#swift2Slider").call(slider)
    console.log("Slider = " + selectedSliderYear)
    
}

