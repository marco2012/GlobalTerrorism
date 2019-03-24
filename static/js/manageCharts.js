// le funzioni di update vanno divise altrimenti la mappa si resetta ad ogni nazione selezionata

function updateCharts(csv = 'terrorism.csv', weaptype=[]){
    
    updateChartsAux(csv, weaptype)

    // //update map
    $.getJSON(
        '/map',
        { computeMap: selectedSliderYear + ";" + JSON.stringify(weaptype) },
        () => updateMap()
    )

}

function updateChartsAux(csv = 'terrorism.csv', weaptype = []){
    console.log("Slider = " + selectedSliderYear)
    console.log("Countries = " + selectedCountries)

    updateSlider(selectedSliderYear)

    //update PCA (lo fa scatter)
    // $.getJSON(
    //     '/pca',
    //     { computePCA: selectedSliderYear + ";" + JSON.stringify(selectedCountries) },
    //     () => scatter()
    // )

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
        filter_year  = selectedSliderYear,
        country      = selectedCountries,
        weaptype     = weaptype
    )

}
        
function resetCharts() {
    selectedCountries = []
    selectedWeapType = []
    updateSlider(0)
    console.log("Slider = " + selectedSliderYear)
    console.log("Countries = " + selectedCountries)
    

    // //reset PCA (lo fa scatter)
    // $.getJSON(
    //     '/pca',
    //     { computePCA: selectedSliderYear + ";" + JSON.stringify([]) },
    //     () => scatter()
    // )

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
        { computeMap: selectedSliderYear + ";" + JSON.stringify([])},
        () => updateMap(true)
    )

}

Array.prototype.pushIfNotExist = function (val) {
    if (typeof (val) == 'undefined' || val == '') { return; }
    val = $.trim(val);
    if ($.inArray(val, this) == -1) {
        this.push(val);
    }
};
