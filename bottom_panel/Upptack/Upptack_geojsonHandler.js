// Upptack_geojsonHandler.js

// Ladda in konfigurationsfilen
var layerURLs = {
    'Mässor': ['https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Upptack/Massor.geojson'],
    'Jaktkort': ['https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Upptack/jaktkort.geojson'],
    'Jaktskyttebanor': ['https://raw.githubusercontent.com/timothylevin/Testmiljo/main/bottom_panel/Upptack/jaktskyttebanor.geojson']
};

var Upptack_geojsonHandler = (function() {
    var layerIsActive = {
        'Mässor': false,
        'Jaktkort': false,
        'Jaktskyttebanor': false
    };

    var geojsonLayers = {
        'Mässor': [],
        'Jaktkort': [],
        'Jaktskyttebanor': []
    };

    var layerStyles = {
        'Mässor': {
            'Massor.geojson': { color: 'orange', radius: 8, fillColor: 'orange', fillOpacity: 0.8 }
        },
        'Jaktkort': {
            'jaktkort.geojson': { color: 'blue', radius: 8, fillColor: 'blue', fillOpacity: 0.8 }
        },
        'Jaktskyttebanor': {
            'jaktskyttebanor.geojson': { color: 'green', radius: 8, fillColor: 'green', fillOpacity: 0.8 }
        }
    };

    // Funktion för att hämta GeoJSON-data och skapa lagret med stil
    function fetchGeoJSONDataAndCreateLayer(layerName, geojsonURLs) {
        geojsonURLs.forEach(function(geojsonURL) {
            axios.get(geojsonURL)
                .then(function(response) {
                    console.log("Successfully fetched GeoJSON data:", response.data);
                    var geojson = response.data;

                    var layer = L.geoJSON(geojson, {
                        pointToLayer: function(feature, latlng) {
                            var filename = getFilenameFromURL(geojsonURL);
                            var style = layerStyles[layerName][filename];
                            return L.circleMarker(latlng, style);
                        },
                        onEachFeature: function(feature, layer) {
                            var popupContent = '<div style="max-width: 300px; overflow-y: auto;">';

                            var hideProperties = ['id', 'Aktualitet'];
                            var hideNameOnlyProperties = ['namn', 'bild', 'info', 'link'];

                            for (var prop in feature.properties) {
                                if (hideProperties.includes(prop)) {
                                    continue;
                                }
                                if (prop === 'BILD') {
                                    popupContent += '<p><img src="' + feature.properties[prop] + '" style="max-width: 100%;" alt="Bild"></p>';
                                } else if (prop === 'LINK' || prop === 'VAGBESKRIV') {
                                    popupContent += '<p><a href="' + feature.properties[prop] + '" target="_blank">Länk</a></p>';
                                } else if (hideNameOnlyProperties.includes(prop)) {
                                    popupContent += '<p>' + feature.properties[prop] + '</p>';
                                } else {
                                    popupContent += '<p><strong>' + prop + ':</strong> ' + feature.properties[prop] + '</p>';
                                }
                            }
                            popupContent += '</div>';
                            layer.bindPopup(popupContent);
                        }
                    });

                    geojsonLayers[layerName].push(layer);

                    if (layerIsActive[layerName]) {
                        layer.addTo(map);
                    }
                })
                .catch(function(error) {
                    console.log("Error fetching GeoJSON data:", error.message);
                });
        });

        layerIsActive[layerName] = true;
    }

// Funktion för att tända och släcka lagret
function toggleLayer(layerName) {
    // Om lagret inte är aktivt, eller om det är det första trycket på knappen
    if (!layerIsActive[layerName]) {
        // Släck alla andra lager
        deactivateAllLayersExcept(layerName);

        // Hämta och skapa geoJSON-lager för det valda lagret
        layerURLs[layerName].forEach(function(geojsonURL) {
            axios.get(geojsonURL)
                .then(function(response) {
                    console.log("Successfully fetched GeoJSON data:", response.data);
                    var geojson = response.data;

                    var layer = L.geoJSON(geojson, {
                        pointToLayer: function(feature, latlng) {
                            var filename = getFilenameFromURL(geojsonURL);
                            var style = layerStyles[layerName][filename];
                            return L.circleMarker(latlng, style);
                        },
                        onEachFeature: function(feature, layer) {
                            var popupContent = '<div style="max-width: 300px; overflow-y: auto;">';

                            var hideProperties = ['id', 'Aktualitet'];
                            var hideNameOnlyProperties = ['namn', 'bild', 'info', 'link'];

                            for (var prop in feature.properties) {
                                if (hideProperties.includes(prop)) {
                                    continue;
                                }
                                if (prop === 'BILD') {
                                    popupContent += '<p><img src="' + feature.properties[prop] + '" style="max-width: 100%;" alt="Bild"></p>';
                                } else if (prop === 'LINK' || prop === 'VAGBESKRIV') {
                                    popupContent += '<p><a href="' + feature.properties[prop] + '" target="_blank">Länk</a></p>';
                                } else if (hideNameOnlyProperties.includes(prop)) {
                                    popupContent += '<p>' + feature.properties[prop] + '</p>';
                                } else {
                                    popupContent += '<p><strong>' + prop + ':</strong> ' + feature.properties[prop] + '</p>';
                                }
                            }
                            popupContent += '</div>';
                            layer.bindPopup(popupContent);
                        }
                    });

                    geojsonLayers[layerName].push(layer);
                    layer.addTo(map);
                    layerIsActive[layerName] = true;
                })
                .catch(function(error) {
                    console.log("Error fetching GeoJSON data:", error.message);
                });
        });
    } else {
        // Om lagret redan är aktivt, släck det
        geojsonLayers[layerName].forEach(function(layer) {
            map.removeLayer(layer);
        });
        geojsonLayers[layerName] = [];
        layerIsActive[layerName] = false;
    }
}


    // Funktion för att släcka alla lager utom det angivna lagret
    function deactivateAllLayersExcept(layerName) {
        Object.keys(layerIsActive).forEach(function(name) {
            if (name !== layerName && layerIsActive[name]) {
                geojsonLayers[name].forEach(function(layer) {
                    map.removeLayer(layer);
                });
                geojsonLayers[name] = [];
                layerIsActive[name] = false;
            }
        });
    }

    function getFilenameFromURL(url) {
        var pathArray = url.split('/');
        var filename = pathArray[pathArray.length - 1];
        return filename;
    }

    // Initialisera alla lager vid start
    fetchGeoJSONDataAndCreateLayer('Mässor', layerURLs['Mässor']);
    fetchGeoJSONDataAndCreateLayer('Jaktkort', layerURLs['Jaktkort']);
    fetchGeoJSONDataAndCreateLayer('Jaktskyttebanor', layerURLs['Jaktskyttebanor']);

    return {
        toggleLayer: toggleLayer,
        fetchGeoJSONDataAndCreateLayer: fetchGeoJSONDataAndCreateLayer,
        deactivateAllLayersExcept: deactivateAllLayersExcept
    };
})();
