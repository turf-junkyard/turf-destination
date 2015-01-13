//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html
var point = require('turf-point');

/**
 * Calculates the destination point given a {@link Point} feature; distance in degrees, radians, miles, or kilometers; and bearing in degrees. This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
 *
 * @module turf/destination
 * @param {Point} start
 * @param {number} distance
 * @param {number} bearing ranging from -180 to 180
 * @param {string} units either miles or kilometers
 * @returns {Point} endpoint
 * @example
 * var point1 = turf.point(-75.343, 39.984)
 * var distance = 100
 * var bearing = 90
 * var units = 'miles' // or 'kilometers', 'degrees', 'radians'
 * var destination = turf.destination(point1, distance, bearing, units)
 * point1.properties['marker-color'] = '#f00';
 * destination.properties['marker-color'] = '#0f0';
 * //=turf.featurecollection([point1, destination])
 */
module.exports = function (point1, distance, bearing, units) {
    var coordinates1 = point1.geometry.coordinates;
    var longitude1 = toRad(coordinates1[0]);
    var latitude1 = toRad(coordinates1[1]);
    var bearing_rad = toRad(bearing);

    var R = 0;
    switch (units) {
    case 'miles':
        R = 3960;
        break
    case 'kilometers':
        R = 6373;
        break
    case 'degrees':
        R = 57.2957795;
        break
    case 'radians':
        R = 1;
        break
    }

    var latitude2 = Math.asin(Math.sin(latitude1) * Math.cos(distance / R) +
        Math.cos(latitude1) * Math.sin(distance / R) * Math.cos(bearing_rad));
    var longitude2 = longitude1 + Math.atan2(Math.sin(bearing_rad) * Math.sin(distance / R) * Math.cos(latitude1),
        Math.cos(distance / R) - Math.sin(latitude1) * Math.sin(latitude2));

    return point(toDeg(longitude2), toDeg(latitude2));
};

function toRad(degree) {
    return degree * Math.PI / 180;
}

function toDeg(rad) {
    return rad * 180 / Math.PI;
}
