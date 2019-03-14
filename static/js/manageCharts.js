function updateCharts(){
    console.log(selectedSliderYear)
    var param

    //update PCA
    param = { computePCA: selectedSliderYear }
    $.getJSON('/pca', param, () => scatter() )

    //update barchart
    param = { computeBarchart: selectedSliderYear }
    $.getJSON('/analytic', param, () => barchart_3(selectedSliderYear) )

    //update parallel chart
    drawParallel(selectedSliderYear)

}

function resetCharts() {
    console.log(selectedSliderYear)

    let param = { computePCA: 0 }
    $.getJSON('/analytic', param, () => scatter())
    drawParallel(0)
    barchart_3(0)
}