var distanciaKMenBici = 1.2;
var tipoTransporte={
	walk: {color:"#26ACDD",icono:"",mode:"WALKING"},
	bicycle:{color:"#97C855",icono:"",mode:"WALKING"},
	car:{color:"#253B86",icono:"",mode:"DRIVING"},
	metro:{color:"#FD7E1D",icono:"",mode:"DRIVING"},
	publicTrans:{color:"#EBE8E0",icono:"",mode:"DRIVING"}
};

var markadorEcoBiciInicio = new google.maps.Marker({
	map: null,
	position: new google.maps.LatLng(19.396546, -99.140507),
	draggable: true,
	//icon: circleRed
});

var markadorEcoBiciFin = new google.maps.Marker({
	map: null,
	position: new google.maps.LatLng(19.396546, -99.140507),
	icon: circleBlue
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
	console.log('candidatos');

	//TODO si candidatos es vacio obliga a punto más cercano auqneu este en parkímetro
	ecobiciMasCercanaOrigena();

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

	activeRoute.push(calcularRuta(markadorOrigen.position,markadorEcoBiciInicio.position,"car"));
	activeRoute.push(calcularRuta(markadorEcoBiciInicio.position,markadorEcoBiciFin.position,"bicycle"));
	activeRoute.push(calcularRuta(markadorEcoBiciFin.position,markadorDestino.position,"walk"));


}

function ecobiciMasCercanaOrigen(puntos) {
	console.log('ecobiciMasCercanaOrigen Con PUNTOS');
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
	for (var i = 0; i < points.length; i++) {
		adentro = false;
		for (var j = 0; j < poligons.length; j++) {

			if (isPointInPoly(poligons[j], points[i])) {
				adentro = true;
			}
		}
		if (!adentro) {
			result.push(points[j]);
		}
	}
	//console.log(result);
	return result;
}

function obtenPoligonosEcoPark() {
	var result = [];
	for (var i = 0; i < poligonosEcoPark.features.length; i++) {
		result.push(poligonosEcoPark.features[i].geometry.coordinates[0][0]);
	}
	return result;
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