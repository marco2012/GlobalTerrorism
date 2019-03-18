function updateCharts(year=0, country=[]){
    
    updateMap(year, country)

    //update map
    map(selectedSliderYear)

}

function updateMap(year , country){
    console.log("Slider = " + selectedSliderYear)

    //update PCA
    $.getJSON(
        '/pca',
        { computePCA: selectedSliderYear },
        () => scatter()
    )

    //update barchart
    $.getJSON(
        '/analytic',
        { computeBarchart: selectedSliderYear },
        () => barchart()
    )

    //update parallel chart
    drawParallel(filter_year = selectedSliderYear, country = selectedCountries)
}
        
function resetCharts() {
    // console.log(selectedSliderYear)
    
    //reset PCA
    $.getJSON(
        '/pca', 
        {computePCA: 0}, 
        () => scatter()
    )

    // //reset barchart
    $.getJSON(
        '/analytic',
        { computeBarchart: 2011 },
        () => barchart()
    )

    //reset parallel chart
    drawParallel(filter_year=0)

    //reset map
    map(filter_year=0)

}