var map; //Mapa general 
var geocoder; //Para obtener coordenadas de nombres
var directionsDisplay; //Para dibujar resultados
var directionsService = new google.maps.DirectionsService();
var rendererOptions = {
	// draggable: true
};
var ecoparks = new google.maps.Data();
var estacionamientos = new google.maps.Data();

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


	/*Cargar ecoparks*/
	ecoparks.loadGeoJson('datos/ecopark.json');

	//toggleParkimetros();
	ecoparks.setStyle({
		icon: '//example.com/path/to/image.png',
		fillColor: '#B0B8DB',
		fillOpacity: 0.35,
		strokeColor: '#DCE0F2',
		strokeWeight: 1
	});

	ecoparks.addListener('click', function(e) {
		console.log(e.latLng);
		dibujaInfoboxBotones(e.latLng);
	});
	/*Cargar estacionamientos*/
	estacionamientos.loadGeoJson('datos/estacionamientospublicos.geojson');

	//toggleParkimetros();
	estacionamientos.setStyle({
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			fillColor: 'pink',
			fillOpacity: 1,
			scale: 4,
			strokeColor: 'white',
			strokeWeight: 1
				// fillOpacity: 2 / feature.getProperty('mag'),
				// while an exponent would technically be correct, quadratic looks nicer
				//scale: Math.pow(feature.getProperty('mag'), 2)
		}

	});

	/*	ecoparks.addListener('click', function(e) {
			console.log(e.latLng);
			dibujaInfoboxBotones(e.latLng);
		});*/


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
	} else if (categoria === 'metro') {
		toggleMetro();
	} else if (categoria === 'estacionamiento') {
		toggleEstacionamientos();
	}

}