//------------------------------------Genera los marcadores de Ecobici---------------------------------
console.log('Manejo Mapas');
var circle = {
	path: google.maps.SymbolPath.CIRCLE,
	fillColor: 'green',
	fillOpacity: 1,
	scale: 6,
	strokeColor: 'white',
	strokeWeight: 1
};


// Obtiene la latitud y longitud de location en los objetos de ecobici ya que vienen en string "lat,lng"
var ecobiciPoints = [];
var markadorEcoBici = [];
console.log(ecobici);
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