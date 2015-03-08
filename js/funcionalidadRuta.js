var distanciaKMenBici = .5;
var tipoTransporte={
	walk: {color:"#26ACDD",icono:"",mode:"WALKING"},
	bicycle:{color:"#97C855",icono:"",mode:"WALKING"},
	car:{color:"#253B86",icono:"",mode:"DRIVING"},
	metro:{color:"#FD7E1D",icono:"",mode:"DRIVING"},
	publicTrans:{color:"#EBE8E0",icono:"",mode:"DRIVING"}
};

var pinIconOrigenBici = new google.maps.MarkerImage(
    "img/x_BICI%20ON.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(42, 42)
);
var pinIconDestinoBici= new google.maps.MarkerImage(
    "img/x_PEATON%20ON.png",
    null, /* size is determined at runtime */
    null, /* origin is 0,0 */
    null, /* anchor is bottom center of the scaled image */
    new google.maps.Size(42, 42)
);
var markadorEcoBiciInicio = new google.maps.Marker({
	map: null,
	position: new google.maps.LatLng(19.396546, -99.140507),
	draggable: true,
	icon: pinIconOrigenBici
});

var markadorEcoBiciFin = new google.maps.Marker({
	map: null,
	position: new google.maps.LatLng(19.396546, -99.140507),
	icon: pinIconDestinoBici
});

function decideRecomendacion() {
	console.log('Decide recomendación...');
	var lat = markadorDestino.getPosition().lat();
	var lng = markadorDestino.getPosition().lng();
	var ecobicisEnCirculo = arrayInCircle(ecobiciPoints, {
		lat: lat,
		lng: lng
	}, distanciaKMenBici);


	//TODO falta distancia mayor a normal , proyección

	var candidatos = determinaFueraPoligonos(obtenPoligonosEcoPark(), ecobicisEnCirculo);
	

	//TODO si candidatos es vacio obliga a punto más cercano auqneu este en parkímetro
	ecobiciMasCercanaOrigen(candidatos);
	activeRoute.push(calcularRuta(markadorOrigen.position,markadorEcoBiciInicio.position,"car"));
	activeRoute.push(calcularRuta(markadorEcoBiciInicio.position,markadorEcoBiciFin.position,"bicycle"));
	activeRoute.push(calcularRuta(markadorEcoBiciFin.position,markadorDestino.position,"walk"));

}

function ecobiciMasCercanaOrigena() {
	console.log('ecobiciMasCercanaOrigen');
	// body...
	var puntoOrigen = {
		lat: markadorOrigen.getPosition().lat(),
		lng: markadorOrigen.getPosition().lng()
	};
	var puntoDestino = {
		lat: markadorDestino.getPosition().lat(),
		lng: markadorDestino.getPosition().lng()
	};

	var ebOrigen = closestPoint(ecobiciPoints, puntoOrigen);
	var ebDestino = closestPoint(ecobiciPoints, puntoDestino);


	markadorEcoBiciInicio.setPosition(new google.maps.LatLng(ebOrigen.lat, ebOrigen.lng));
	markadorEcoBiciInicio.setMap(map);
	markadorEcoBiciFin.setPosition(new google.maps.LatLng(ebDestino.lat, ebDestino.lng));
	markadorEcoBiciFin.setMap(map);




}

function ecobiciMasCercanaOrigen(puntos) {
	console.log('ecobiciMasCercanaOrigen Con PUNTOS');
	console.log(puntos);
	var puntoOrigen = {
		lat: markadorOrigen.getPosition().lat(),
		lng: markadorOrigen.getPosition().lng()
	};
	var puntoDestino = {
		lat: markadorDestino.getPosition().lat(),
		lng: markadorDestino.getPosition().lng()
	};
	var ebOrigen = closestPoint(puntos, puntoOrigen);
	var ebDestino = closestPoint(ecobiciPoints, puntoDestino);

	markadorEcoBiciInicio.setPosition(new google.maps.LatLng(ebOrigen.lat, ebOrigen.lng));
	markadorEcoBiciInicio.setMap(map);
	markadorEcoBiciFin.setPosition(new google.maps.LatLng(ebDestino.lat, ebDestino.lng));
	markadorEcoBiciFin.setMap(map);




}

function determinaFueraPoligonos(poligons, points) {
	var result = [];
	var adentro = false;
	var cuentaAdentro=0;

	for (var i = 0; i < points.length; i++) {
		adentro = false;
		for (var j = 0; j < poligons.length; j++) {
			var veamos= isPointInPoly(poligons[j], points[i]);
			console.log(veamos);
			if (veamos) {
				
				adentro = true;
			}
		}
		if (!adentro) {
			result.push((points[i]));
		}
	}
	console.log(result);
	return result;
}

function obtenPoligonosEcoPark() {

	var result = [];
	var poligonos=[];
	for (var i = 0; i < poligonosEcoPark.features.length; i++) {
		result=[];
		console.log(poligonosEcoPark.features[i].geometry.coordinates[0][0]);
		for(var j= 0; j < poligonosEcoPark.features[i].geometry.coordinates[0][0].length; j++){

			result.push({lat:poligonosEcoPark.features[i].geometry.coordinates[0][0][j][1],lng:poligonosEcoPark.features[i].geometry.coordinates[0][0][j][0]});
		}
		console.log(result);
		poligonos.push(result);
	}
	
	return poligonos;
}




function calcularRuta(start,end,type) {
	console.log('Calculando ruta...')
	var datos=tipoTransporte[type];
	/*var waypts = [];
	waypts.push({
		location: new google.maps.LatLng(19.406048, -99.168616),
		stopover: true
	});*/
	console.log(datos);

	var request = {
		origin: start,
		destination: end,
		//draggable: true,
		//waypoints: waypts,
		travelMode: google.maps.DirectionsTravelMode[datos.mode]
	};

	var rendererOptions2 = {
		draggable: true,
		suppressMarkers: true,
		polylineOptions: { strokeColor: datos.color } 
	};

	var directionsDisplay2 = new google.maps.DirectionsRenderer(rendererOptions2);
	directionsDisplay2.setMap(map);
	//directionsDisplay2.setOptions({ preserveViewport: true });
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay2.setDirections(result);
			
		}
	});
	return directionsDisplay2;
}
//-----------------------------------active route es el que borra  las rutas		
function wipeRoute(){	
			if (activeRoute.length > 0) {

				for (var i = 0; i < activeRoute.length; i++) {
					activeRoute[i].setMap(null);
				}
				activeRoute = [];
			}
		}