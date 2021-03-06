//------------------------------------Genera los marcadores de Ecobici---------------------------------
console.log('Manejo Mapas');
var circle = {
	path: google.maps.SymbolPath.CIRCLE,
	fillColor: 'green',
	fillOpacity: 1,
	scale: 3,
	strokeColor: 'white',
	strokeWeight: 1
};
var circleOrange = {
	path: google.maps.SymbolPath.CIRCLE,
	fillColor: 'orange',
	fillOpacity: 1,
	scale: 4,
	strokeColor: 'white',
	strokeWeight: 1
};
var circleRed = {
	path: google.maps.SymbolPath.CIRCLE,
	fillColor: 'red',
	fillOpacity: 1,
	scale: 4,
	strokeColor: 'white',
	strokeWeight: 1
};

var circleBlue = {
	path: google.maps.SymbolPath.CIRCLE,
	fillColor: 'blue',
	fillOpacity: 1,
	scale: 5,
	strokeColor: 'white',
	strokeWeight: 2
};
var pinEcobicis = new google.maps.MarkerImage(
	"img/x_BICI%20ICONO.png",
	null, /* size is determined at runtime */
	null, /* origin is 0,0 */
	null, /* anchor is bottom center of the scaled image */
	new google.maps.Size(20, 20)
);

// Obtiene la latitud y longitud de location en los objetos de ecobici ya que vienen en string "lat,lng"
var ecobiciPoints = [];
var markadorEcoBici = [];
for (var i = 0; i < ecobici.length; i++) {
	var latlngStr = ecobici[i].location.split(",", 2);
	var lat = parseFloat(latlngStr[0]);
	var lng = parseFloat(latlngStr[1]);
	ecobiciPoints.push({
		lat: lat,
		lng: lng
	});

	// Crea marcadores invisibles para no contaminar visualmente
	var aux = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: null, //Si se le inserta el mapa map le va a valer verga
		icon: circle
	});
	markadorEcoBici.push(aux);
}

var metroPoints = [];
var markadorMetro = [];
for (var i = 0; i < metroArr.length; i++) {
	var lat = parseFloat(metroArr[i].LATITUDE);
	var lng = parseFloat(metroArr[i].LONGITUDE);
	metroPoints.push({
		lat: lat,
		lng: lng
	});

	// Crea marcadores invisibles para no contaminar visualmente
	var aux = new google.maps.Marker({
		position: new google.maps.LatLng(lat, lng),
		map: null, //Si se le inserta el mapa map le va a valer verga
		icon: circleOrange
	});
	markadorMetro.push(aux);
}

