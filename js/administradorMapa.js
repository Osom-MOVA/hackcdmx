var map; //Mapa general 
var geocoder; //Para obtener coordenadas de nombres
var directionsDisplay; //Para dibujar resultados
var directionsService = new google.maps.DirectionsService();
var rendererOptions = {
	// draggable: true
};
var ecoparks = new google.maps.Data();
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

	
	ecoparks.loadGeoJson('datos/ecopark.json');

	//toggleParkimetros();
	ecoparks.setStyle({
		//icon: '//example.com/path/to/image.png',
		fillColor: '#818DBE',
		fillOpacity: 0.35,
		strokeColor: '#565E7F',
		strokeWeight: 3
	});

	ecoparks.addListener('click', function(e) {
		console.log(e.latLng);
		dibujaInfoboxBotones(e.latLng);
	});

	
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