// le funzioni di update vanno divise altrimenti la mappa si resetta ad ogni nazione selezionata

function updateCharts(){
    
    updateChartsAux()

    //update map
    map(selectedSliderYear)

}

function updateChartsAux(){
    console.log("Slider = " + selectedSliderYear)
    console.log("Countries = " + selectedCountries)

    //update PCA
    $.getJSON(
        '/pca',
        { computePCA: selectedSliderYear },
        () => scatter()
    )

    //update barchart
    let param = { computeBarchart: selectedSliderYear + ";" + JSON.stringify(selectedCountries) }
    $.getJSON(
        '/analytic',
        param,
        () => barchart()
    )

    //update parallel chart
    parallel(filter_year = selectedSliderYear, country = selectedCountries)
}
        
function resetCharts() {
    // console.log(selectedSliderYear)
    selectedSliderYear = 2017
    slider(selectedSliderYear)
    
    //reset PCA
    $.getJSON(
        '/pca', 
        {computePCA: 0}, 
        () => scatter()
    )

    // //reset barchart
    //update barchart
    let param = { computeBarchart: 2017 + ";" + JSON.stringify([]) }
    $.getJSON(
        '/analytic',
        param,
        () => barchart()
    )

    //reset parallel chart
    parallel(filter_year=0)

    //reset map
    map(filter_year=0)

}