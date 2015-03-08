function Point(latitud, longitud) {
  this.lat = latitud;
  this.lng = longitud;
}


function isPointInPoly(poly, pt) {
  for (var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)

    ((poly[i].lat <= pt.lat && pt.lat < poly[j].lat) || (poly[j].lat <= pt.lat && pt.lat < poly[i].lat)) && (pt.lng < (poly[j].lng - poly[i].lng) * (pt.lat - poly[i].lat) / (poly[j].lat - poly[i].lat) + poly[i].lng) && (c = !c);
  return !c;
}



function sqr(x) {
  return x * x
}

function dist2(v, w) {
  return sqr(v.lng - w.lng) + sqr(v.lat - w.lat)
}


function antesPerpendicular(p, v, w) {
  var l2 = dist2(v, w);

  if (l2 == 0) return dist2(p, v);

  var t = ((p.lng - v.lng) * (w.lng - v.lng) + (p.lat - v.lat) * (w.lat - v.lat)) / l2;

  if (t > 1) return false;
  if (t < 0) return false;

  return true;

}

function inCircle(points, center, r) {
  //console.log(distance(points.lat,points.lng,center.lat,center.lng,"K"));
  if (distance(points.lat, points.lng, center.lat, center.lng, "K") <= r) {
    return true;
  }
  return false;
}

function arrayInCircle(points, center, r) {
  var result = [];
  for (var i = 0; i < points.length; i++) {
    if (inCircle(points[i], center, r))
      result.push(points[i]);
  }
  return result;
}


function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = Math.PI * lat1 / 180;
  var radlat2 = Math.PI * lat2 / 180;
  var radlon1 = Math.PI * lon1 / 180;
  var radlon2 = Math.PI * lon2 / 180;
  var theta = lon1 - lon2;
  var radtheta = Math.PI * theta / 180;
  var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

function closestPoint(arrayPoints, p) {
  var result;
  console.log(arrayPoints);
  var min = distance(p.lat, p.lng, arrayPoints[0].lat, arrayPoints[0].lng);
  var dist;
  var result;
  console.log(arrayPoints);
  for (var i = 0; i < arrayPoints.length; i++) {
    dist = distance(p.lat, p.lng, arrayPoints[i].lat, arrayPoints[i].lng)
    if (dist <= min) {
      result = arrayPoints[i];
      min = dist;
    }
  }
  return result;
}

function calcClosest() {

  var points = [{
    lat: 0,
    lng: 0
  }, {
    lat: 0,
    lng: 50
  }, {
    lat: 50,
    lng: 10
  }, {
    lat: -50,
    lng: -10
  }, {
    lat: 0,
    lng: -50
  }, {
    lat: 0,
    lng: 0
  }];


  console.log(muestra);
}