



var mymap = L.map('mapped').setView([34.0522, -118.2437], 8);

// tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    zoom: 5,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(mymap);


console.log("test")

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson';
d3.json(url).then(function (data) {
    // console.log(data.features);

    latLon = data.features;

    for (j = 0; j < latLon.length; j++) {

        // console.log(latLon[j].geometry.coordinates)

        lon = latLon[j].geometry.coordinates[0];
        lat = latLon[j].geometry.coordinates[1];
        // console.log(` The latittude is ${lat} and the longitude is ${lon}`)

        // * Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes should appear larger and darker in color.

        mag = latLon[j].properties.mag
        console.log(latLon[j].properties.mag)

        var magRadius = function(mag) {
          return mag * 3000;  
        };

        var fillOppacity = function(mag) {
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

    var magColor = function(mags) {
        if (mags <= 1.9) {
            return underOnePointNine
        }
        else if (mags <=3.9) {
            return threePointNine
        }
        else if (mags <=4.9) {
            return fourPointNine
        }
        else if (mags <=5.9) {
            return fivePointNine
        }
        else if (mags <=6.9) {
            return  sixPointNine
        }
        else if (mags <=7.9) {
            return sevenPointNine
        }
        else if (mags <=8.9) {
            return eightPointNine
        }
        else if (mags > 9) {
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



