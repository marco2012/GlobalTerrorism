function updateCharts(country=[]){
    // console.log("Slider = " + selectedSliderYear)
    
    // //update PCA
    // $.getJSON(
    //     '/pca', 
    //     {computePCA: selectedSliderYear}, 
    //     () => scatter() 
    // )
        
    // //update barchart
    // $.getJSON(
    //     '/analytic', 
    //     {computeBarchart: selectedSliderYear},
    //     () => barchart_3(selectedSliderYear) 
    // )

    //update parallel chart
    drawParallel(filter_year = selectedSliderYear, country = selectedCountries)

    //update map
    map(filter_year=selectedSliderYear)
            
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

    drawParallel(filter_year=0)
    // barchart_3(0)
    map(filter_year=0)
    // worldChart.filterAll(); 
}