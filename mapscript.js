var issCurrentPos;
var issLat;
var issLon;
var markerArray = [];

function moveISS() {
	//This function will go into a loop where it gets the current location for ISS every 5 seconds
		$.getJSON('https://api.wheretheiss.at/v1/satellites/25544', function(data) {
			var lat = parseFloat(data['latitude']);
			var lon = parseFloat(data['longitude']);
			issCurrentPos = ({lat: lat, lng: lon});
			//console.log(issCurrentPos);
			addMarker(issCurrentPos);
			});
		setTimeout(moveISS, 5000);
		removeISSicon();
	};
	
function initMap() {
	//Ititializing a map of the world, centered at the equator
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 3,
          center: {lat: 0, lng: 0},
          mapTypeId: 'satellite'
        });
        //creates an array to hold the coordinates outside of the moveISS()-loop
		flightPlanCoordinates = [];
        moveISS();
	  }

function addMarker(location) {
		//adds a marker at the current location of ISS, and draws a line from the previous locations
        var marker = new google.maps.marker.AdvancedMarkerElement({
          position: location,
          map: map
        });
        markerArray.push(marker);
		if(flightPlanCoordinates.length < 1000){
			flightPlanCoordinates.push(location);
		} else {
			flightPlanCoordinates.shift();
			flightPlanCoordinates.push(location);
		}
		flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
		flightPath.setMap(null);
		flightPath.setMap(map);
      }

function setMapOnAll(map) {
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(map);
        }
      }
	  
function removeISSicon(){
		//Removes the icon before a new one is set
		setMapOnAll(null);
		markerArray = [];	
}