
// API key
const API_KEY = "pk.eyJ1IjoiaGJ0dXJ0bGUiLCJhIjoiY2p3MTFqMjN2MDByNTQ0c2V3czZ4MHJyYSJ9.5cRNjoNcc6Lca1wGObS0CQ";

// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3
});

// Add a tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);
 
function someFunction(site)     
{  
  return site.slice(0, -1);   
    // return site.replace(/\/$/, "");
} 

var link = "/mapOne"
// document.querySelector(".leaflet-popup-pane").addEventListener("load", function (event) {
//   var tagName = event.target.tagName,
//       popup = map._popup; // Currently open popup, if any.

//   if (tagName === "IMG" && popup) {
//     popup.update();
//   }
// }, true);
d3.json(link, function(mapOne) {
  // Creating a GeoJSON layer with the retrieved data
  for (var i = 0; i < mapOne.length; i++) {
    var city = mapOne[i];
    var image = someFunction(city.image)
    L.marker(city.coordinates)
    .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>City:  " + city.location + "</h3><br><img alt='Image not available.' src="+image + "/>")
    .addTo(myMap);
    }
  // L.geoJson(map1).addTo(myMap);
});


// for (var i = 0; i < cities.length; i++) {
//   var city = cities[i];
//   var image = someFunction(city.image)
//   L.marker(city.location)
//   .bindPopup("<h1>" + city.name + "</h1> <hr> <h3>City:  " + city.location + "</h3><br><img src="+image +"/>")
//   .addTo(myMap);
// }
// Binding a pop-up to our marker
// marker.bindPopup("New York<br>Population: Large");