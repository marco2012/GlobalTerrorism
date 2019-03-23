// http://jvectormap.com/documentation/javascript-api/jvm-map/
function map3() {
    
    handleMapData( function (values) {
        
        var map = new jvm.Map( { 
            map: 'world_mill',
            container: $('.world-map'),
            series: {
                regions: [{
                    values: values,
                    scale: ['#ffc8c8', '#a40000'],
                    normalizeFunction: 'polynomial',
                    legend: {horizontal:true}
                }]
            },
            backgroundColor: '#1A222C',
            
            onRegionTipShow: function (e, el, code) {
                var victims = values[code] == undefined ? 0 : values[code]
                el.html(el.html() + '</br>' + victims + ' victims');
            },
            onRegionClick: function (e,code){
                console.log(code);
            }
            
        })
        
    })
}

function updateMap(){
    handleMapData(function (values) {
        var map = $('.world-map').vectorMap('get', 'mapObject')
        map.series.regions[0].clear();
        map.series.regions[0].setValues(values)
    })
}

function handleMapData(callback){
    d3.csv("data/terrorism_map.csv", function (data) {
        var values = {};
        data.map(function (d) {
            values[d.country_code] = parseInt(d.nkill)
        })
        callback(values)
    })
}