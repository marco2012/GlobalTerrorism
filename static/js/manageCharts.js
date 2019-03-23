// le funzioni di update vanno divise altrimenti la mappa si resetta ad ogni nazione selezionata

function updateCharts(csv = 'terrorism.csv'){
    
    updateChartsAux(csv)

    //update map
    $.getJSON(
        '/map',
        { computeMap: selectedSliderYear },
        () => updateMap()
    )

}

function updateChartsAux(csv = 'terrorism.csv'){
    console.log("Slider = " + selectedSliderYear)
    console.log("Countries = " + selectedCountries)

    updateSlider(selectedSliderYear)

    //update PCA
    $.getJSON(
        '/pca',
        { computePCA: selectedSliderYear + ";" + JSON.stringify(selectedCountries) },
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
    
    $('#all_years_btn').prop('disabled', true);

    updateSlider(0)

    selectedCountries = []

    //reset PCA
    $.getJSON(
        '/pca',
        { computePCA: selectedSliderYear + ";" + JSON.stringify([]) },
        () => scatter()
    )

    // reset barchart
    let param = { computeBarchart: selectedSliderYear + ";" + JSON.stringify([]) }
    $.getJSON(
        '/analytic',
        param,
        () => barchart()
    )

    //reset parallel chart
    parallel(data_to_read = 'terrorism.csv', filter_year = selectedSliderYear, country = [])

    //reset map
    $.getJSON(
        '/map',
        { computeMap: selectedSliderYear },
        () => updateMap()
    )

}