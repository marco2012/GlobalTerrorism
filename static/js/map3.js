// http://jvectormap.com/documentation/javascript-api/jvm-map/

var selectedCountries = [];    //selected countries
var map3values = {}
var map3AvailableCountries = []

function map3() {
    
    handleMapData(function (values, availableCountries) {
        
        var map = new jvm.Map( { 
            map: 'world_mill',
            container: $('.world-map'),
            series: {
                regions: [{
                    values: values,
                    scale: ['#ffffff', '#a40000'],
                    normalizeFunction: 'polynomial',
                    legend: { title: 'Victims'}
                }]
            },
            regionStyle: {
                hover: {
                    "fill-opacity": 0.8,
                    cursor: 'pointer'
                },
                selected: {
                    fill: '#F4C94E'
                }
            },
            backgroundColor: '#1A222C',
            onRegionTipShow: function (e, el, code) {
                var victims = map3values[code] == undefined ? 0 : map3values[code]
                el.html(el.html() + '</br>' + victims + ' victims');
            },

            onRegionClick: function (e,code){
                let country = codeToCountry[code]
                if (map3AvailableCountries.indexOf(country) == -1) {
                    document.getElementById('id01').style.display = 'block'
                    $('#dialog_title_span').html('<h2>No data</h2>')
                    $('#dialog_content_span').html("<br/><h4>There are no data for selected country</h4><br/>")
                } else {
                    map.setSelectedRegions(code)
                    selectedCountries.pushIfNotExist(country)
                    $('#world-map-region-trigger').click(); // trigger scatterplot update based on region
                    updateChartsAux()
                }

            }
            
        })
        
    })
}

function updateMap(reset=false){
    handleMapData(function (values, availableCountries) {
        // map3values = values
        // map3AvailableCountries = availableCountries
        var map = $('.world-map').vectorMap('get', 'mapObject')
        if (reset) map.clearSelectedRegions()
        map.series.regions[0].clear();
        map.series.regions[0].setValues(values)
    })
}

function handleMapData(callback){
    d3.csv("data/terrorism_map.csv", function (data) {
        
        var values = {}
        var availableCountries = []
        data.map(function (d) {
            values[d.country_code] = parseInt(d.nkill)
            availableCountries.push(d.country_txt)
        })
        map3values = values
        map3AvailableCountries = availableCountries
        callback(values, availableCountries)
    })
}

let codeToCountry = { "BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herz.", "BN": "Brunei", "BO": "Bolivia", "JP": "Japan", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BW": "Botswana", "BR": "Brazil", "BS": "Bahamas", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "Timor-Leste", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "GW": "Guinea-Bissau", "GT": "Guatemala", "GR": "Greece", "GQ": "Eq. Guinea", "GY": "Guyana", "GE": "Georgia", "GB": "United Kingdom", "GA": "Gabon", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HN": "Honduras", "PR": "Puerto Rico", "PS": "Palestine", "PT": "Portugal", "PY": "Paraguay", "PA": "Panama", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PL": "Poland", "ZM": "Zambia", "EH": "W. Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Is.", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MA": "Morocco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MN": "Mongolia", "MK": "Macedonia", "MW": "Malawi", "MR": "Mauritania", "UG": "Uganda", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "XS": "Somaliland", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Is.", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "XK": "Kosovo", "CI": "Côte d'Ivoire", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "XC": "N. Cyprus", "CA": "Canada", "CG": "Congo", "CF": "Central African Rep.", "CD": "Dem. Rep. Congo", "CZ": "Czech Rep.", "CY": "Cyprus", "CR": "Costa Rica", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "S. Sudan", "SR": "Suriname", "KH": "Cambodia", "SV": "El Salvador", "SK": "Slovakia", "KR": "Korea", "SI": "Slovenia", "KP": "Dem. Rep. Korea", "KW": "Kuwait", "SN": "Senegal", "SL": "Sierra Leone", "KZ": "Kazakhstan", "SA": "Saudi Arabia", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Rep.", "DJ": "Djibouti", "DK": "Denmark", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "LB": "Lebanon", "LA": "Lao PDR", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LV": "Latvia", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "Fr. S. Antarctic Lands", "TG": "Togo", "TD": "Chad", "LY": "Libya", "AE": "United Arab Emirates", "VE": "Venezuela", "AF": "Afghanistan", "IQ": "Iraq", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "IN": "India", "TZ": "Tanzania", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique" }