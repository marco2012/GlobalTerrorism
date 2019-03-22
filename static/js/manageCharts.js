// le funzioni di update vanno divise altrimenti la mappa si resetta ad ogni nazione selezionata

function updateCharts(csv = 'terrorism.csv'){
    
    updateChartsAux(csv)

    //update map
    // map(selectedSliderYear)

    //update map
    $.getJSON(
        '/map',
        { computeMap: selectedSliderYear },
        () => map2()
    )

}

function updateChartsAux(csv = 'terrorism.csv'){
    console.log("Slider = " + selectedSliderYear)
    console.log("Countries = " + selectedCountries)

    //update slider
    if (selectedSliderYear == 0){
        slider(2017) 
        $(".d3slider-rect-value ").css("fill", "#006EE3"); //remove slider fill color
    } 
    else slider(selectedSliderYear)

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
    parallel(
        data_to_read = csv, 
        filter_year = selectedSliderYear, 
        country = selectedCountries
    )
}
        
function resetCharts() {
    
    //reset slider
    selectedSliderYear = 0
    console.log("Slider = " + selectedSliderYear)
    slider(2017)
    $(".d3slider-rect-value ").css("fill", "#006EE3");


    //reset PCA
    $.getJSON(
        '/pca',
        { computePCA: selectedSliderYear },
        () => scatter()
    )

    // //reset barchart
    //update barchart
    let param = { computeBarchart: selectedSliderYear + ";" + JSON.stringify([]) }
    $.getJSON(
        '/analytic',
        param,
        () => barchart()
    )

    //reset parallel chart
    parallel(data_to_read = 'terrorism.csv', filter_year = selectedSliderYear, country = [])

    //reset map
    // map(filter_year = selectedSliderYear)
    $.getJSON(
        '/map',
        { computeMap: selectedSliderYear },
        () => map2()
    )

}