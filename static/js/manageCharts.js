function updateCharts(){
    console.log(selectedSliderYear)

    let param = { prova: selectedSliderYear + "," + choice[1] + "," + d1.toString() }
    $.getJSON('/analytic', param, function (data, textStatus, jqXHR) {
            console.log(data);
        }
    )


}

function resetCharts() {
    // slider.value(0)
    // d3.select("#swift2Slider").remove()
    // d3.select("#swift2Slider").call(slider)
    console.log(selectedSliderYear)
}