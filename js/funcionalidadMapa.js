var resultadoOrigen, resultadosDestino, resultadosGeneral;
var activeRoute=[];

var markadorOrigen = new google.maps.Marker({
	map: null,
	position: new google.maps.LatLng(19.396546, -99.140507),
});

var markadorDestino = new google.maps.Marker({
	map: null,
	position: new google.maps.LatLng(19.396546, -99.140507),
	draggable: true
});

//Capa de polígonos con parquímetro
var ecoParkPoligonosKML = new google.maps.KmlLayer({
	url: 'https://raw.githubusercontent.com/Almaguer/KML_Ecoparq/master/poligonoecoparqenoperacion.kml'
});

/* Infobox para sleeccionar origen destino*/
var infowindowOrigenDestino = new google.maps.InfoWindow({
	content: '<h4>Escoge Pin</h4><button id="origenEnMapa">Origen</button><button id="destinoEnMapa">Destino</button>'
		// maxWidth: 200
});

function dibujaInfoboxBotones(location) {
		infowindowOrigenDestino.setPosition(location);
		infowindowOrigenDestino.open(map);

		document.getElementById('origenEnMapa').onclick = function(e) {
			markadorOrigen.setPosition(location);
			markadorOrigen.setMap(map);
			infowindowOrigenDestino.close();
			geocoder.geocode({
				'latLng': location
			}, function(results, status) {
				resuelveDeocder(results, status, location, 'origen')
			});

		};
		document.getElementById('destinoEnMapa').onclick = function(e) {
			markadorDestino.setPosition(location);
			markadorDestino.setMap(map);
			if (markadorOrigen.map == null) {
				markadorOrigen.setMap(map);
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(successGeoLoc, errorGeoLoc);
				} else {
					//alert('geolocation not supported');
				}
				geocoder.geocode({
					'latLng': markadorOrigen.getPosition()
				}, function(results, status) {
					resuelveDeocder(results, status, markadorOrigen.getPosition(), 'origen')
				});
			}
			console.log(activeRoute);
			if(activeRoute.length>0){

				for(var i=0;i<activeRoute.length;i++){
					activeRoute[i].setMap(null);
				}
				activeRoute=[];
			}

			geocoder.geocode({
				'latLng': location
			}, function(results, status) {
				resuelveDeocder(results, status, location, 'destino')
			});
			infowindowOrigenDestino.close();

			
			decideRecomendacion();
			/*obtenPoligonos();*/

		};

	}
	// Fin Infobox
function resuelveDeocder(results, status, latlng, tipo) {
	console.log(tipo);
	if (status == google.maps.GeocoderStatus.OK) {
		if (results[1]) {
			if (tipo == 'origen') {
				//alert(results[1].formatted_address);
				document.getElementById('inputOrigen').value = results[1].formatted_address;
			} else {
				//alert(results[1].formatted_address + '1');
				document.getElementById('inputDestino').value = results[1].formatted_address;

			}

		} else {
			alert('No results found');
		}
	} else {
		alert('Geocoder failed due to: ' + status);
	}
}

function successGeoLoc(position) {
	//alert(position.coords.latitude + ', ' + position.coords.longitude);
	markadorOrigen.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
}

function errorGeoLoc(msg) {
	console.log(msg);
	//alert('error: ' + 'Geo-localización denegada');

}

var ecoBiciVisible = false;
function toggleEcoBici() {
	console.log('toggleEcoBici');
	ecoBiciVisible = !ecoBiciVisible;
	if (ecoBiciVisible) {
		for (var i = markadorEcoBici.length - 1; i >= 0; i--) {
			markadorEcoBici[i].setMap(map);
		};
	} else {
		for (var i = markadorEcoBici.length - 1; i >= 0; i--) {
			markadorEcoBici[i].setMap(null);
		};
	}
}

var ecoParkVisible = false;
function toggleParkimetros() {
	console.log('toggleParkimetros');
	ecoParkVisible = !ecoParkVisible;
	if (ecoParkVisible) {
		ecoparks.setMap(map);
	} else {
		ecoparks.setMap(null);
	}

}