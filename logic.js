
var mymap = L.map('mapped').setView([49.975514, -153.006376], 5);

// tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    zoom: 50,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(mymap);

var legend = L.control();

legend.onAdd = function (mymap) {
     
    underOnePointNine = '#426eff',
    threePointNine = "#9ed3e5",
    fourPointNine = "#e7f252",
    fivePointNine = "#ffa551",
    sixPointNine = "#d051ff",
    sevenPointNine = "#ff30e0",
    eightPointNine = "#ff3052",
    ninePoint = "#ff0000"

var getColor = function (mags) {
    if (mags <= 1) {
        return underOnePointNine
    }
    else if (mags <= 1.5) {
        return threePointNine
    }
    else if (mags <= 2.0) {
        return fourPointNine
    }
    else if (mags <= 2.5) {
        return fivePointNine
    }
    else if (mags <= 3.0) {
        return sixPointNine
    }
    else if (mags <= 3.5) {
        return sevenPointNine
    }
    else if (mags <= 4.0) {
        return eightPointNine
    }
    else if (mags > 4.0) {
        return ninePoint
    }
}

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,1,1.5,2.0,2.5,3.0,3.5,4],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(mymap);

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
d3.json(url).then(function (data) {
    // console.log(data.features);

    latLon = data.features;

    for (j = 0; j < latLon.length; j++) {

        // console.log(latLon[j].geometry.coordinates)

        lon = latLon[j].geometry.coordinates[0];
        lat = latLon[j].geometry.coordinates[1];
        // console.log(` The latittude is ${lat} and the longitude is ${lon}`)

        mag = latLon[j].properties.mag
        // console.log(latLon[j].properties.mag)

        var magRadius = function (mag) {
            return mag * 3000;
        };

        var fillOppacity = function (mag) {
            return mag / 5;
        };

        underOnePointNine = '#426eff',
            threePointNine = "#9ed3e5",
            fourPointNine = "#e7f252",
            fivePointNine = "#ffa551",
            sixPointNine = "#d051ff",
            sevenPointNine = "#ff30e0",
            eightPointNine = "#ff3052",
            ninePoint = "#ff0000"

        var magColor = function (mags) {
            if (mags <= 1) {
                return underOnePointNine
            }
            else if (mags <= 1.5) {
                return threePointNine
            }
            else if (mags <= 2.0) {
                return fourPointNine
            }
            else if (mags <= 2.5) {
                return fivePointNine
            }
            else if (mags <= 3.0) {
                return sixPointNine
            }
            else if (mags <= 3.5) {
                return sevenPointNine
            }
            else if (mags <= 4.0) {
                return eightPointNine
            }
            else if (mags > 4.1) {
                return ninePoint
            }
        }

        var circle = L.circle([lat, lon], {
            color: magColor(mag),
            // fillColor: magRadius(mag),
            fillOpacity: fillOppacity(mag),
            radius: magRadius(mag)
        }).addTo(mymap);
    }
})







