function updateCharts(){
    console.log(selectedSliderYear)

    //update PCA
    let param = { computePCA: selectedSliderYear }
    $.getJSON('/analytic', param,
        function (data, textStatus, jqXHR) {
            console.log(data);
            // worldChart.filterAll(); dc.redrawAll();
            // if (d1.length > 0 && d1.length < 3) {
            //     updateScatter();
            //     updateParallel();
            // }
        })

    // //update parallel chart
    // drawParallel(selectedSliderYear)

    // //update barchart
    // barchart_3(selectedSliderYear)
}

function resetCharts() {
    console.log(selectedSliderYear)

    drawParallel(0)
    barchart_3(0)
}