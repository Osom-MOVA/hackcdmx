var map; //Mapa general 
var geocoder; //Para obtener coordenadas de nombres
var directionsDisplay; //Para dibujar resultados
var directionsService = new google.maps.DirectionsService();
var rendererOptions = {
	// draggable: true
};
//-----------------------Se inicializa el mapa de google con sus parametros
function initialize() {
	geocoder = new google.maps.Geocoder();
	var mapOptions = {
		zoom: 12,
		center: new google.maps.LatLng(19.396546, -99.140507),
		disableDefaultUI: true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);


	directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	directionsDisplay.setMap(map);

	/* Agregar click */
	google.maps.event.addListener(map, 'click', function(e) {
		console.log(e.latLng);
		dibujaInfoboxBotones(e.latLng);
	});

		toggleParkimetros();

	

}

google.maps.event.addDomListener(window, 'load', initialize);

function muestraElemento(elem, categoria, c) {
	elem.src = elem.src.replace('ON', 'aux');
	elem.src = elem.src.replace('OFF', 'ON');
	elem.src = elem.src.replace('aux', 'OFF');
	console.log(elem);
	console.log(categoria);
	if (categoria === 'ecobici') {
		toggleEcoBici();
	} else if (categoria === 'ecopark') {
		toggleParkimetros();
	}

}