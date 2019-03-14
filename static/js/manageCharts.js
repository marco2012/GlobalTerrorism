function updateCharts(){
    console.log(selectedSliderYear)

    //update PCA
    let param = { computePCA: selectedSliderYear }
    $.getJSON('/analytic', param, () => scatter() )

    //update parallel chart
    drawParallel(selectedSliderYear)

    //update barchart
    barchart_3(selectedSliderYear)
}

function resetCharts() {
    console.log(selectedSliderYear)

    let param = { computePCA: 0 }
    $.getJSON('/analytic', param, () => scatter())
    drawParallel(0)
    barchart_3(0)
}