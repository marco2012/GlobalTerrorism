function updateCharts(year=0, country=[]){
    // console.log("Slider = " + selectedSliderYear)
    
    //update PCA
    $.getJSON(
        '/pca', 
        {computePCA: selectedSliderYear}, 
        () => scatter()
    )
        
    // //update barchart
    // $.getJSON(
    //     '/analytic', 
    //     {computeBarchart: selectedSliderYear},
    //     () => barchart_3(selectedSliderYear) 
    // )

    //update parallel chart
    drawParallel(filter_year = selectedSliderYear, country = selectedCountries)

    //update map
    if (selectedSliderYear!=0)
        map(selectedSliderYear)

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
    // $.getJSON(
    //     '/analytic',
    //     { computeBarchart: 0 },
    //     () => barchart_3(0)
    // )

    //reset parallel chart
    drawParallel(filter_year=0)

    // barchart_3(0)

    //reset map
    map(filter_year=0)

}