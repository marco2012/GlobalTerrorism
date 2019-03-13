// https://stackoverflow.com/questions/42864790/sliders-work-in-d3-js-v3-but-not-in-v4

var selectedSliderYear = 0
let min = 1975
let max = 2017
let step = 5
let tickFormatter = d3.format(".0f")

var slider = d3.slider()
    .min(min)
    .max(max)
    .showRange(true)
    .value(max)
    .tickFormat(tickFormatter)
    .tickValues(d3.range(min, max + 1, step))
    .stepValues(d3.range(min, max + 1))
    .callback(function (evt) {
        selectedSliderYear = self.slider.value()
        // console.log('callback: ' + selectedSliderYear);
    });

d3.select("#swift2Slider").call( slider )
