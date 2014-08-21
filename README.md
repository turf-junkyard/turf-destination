turf-destination
=============
[![build status](https://secure.travis-ci.org/Turfjs/turf-destination.png)](http://travis-ci.org/Turfjs/turf-destination)

Calculates the destination point given one point feature, distance in degrees, radians, miles, or kilometers, and bearing in degrees. This uses the haversine formula to account for global curvature.

###Install

```sh
npm install turf-destination
```

###Parameters

|name|description|
|---|---|
|point1|point feature|
|distance|distance units|
|bearing|number (-180 - 180)|
|units|'miles' or 'kilometers'|

###Usage

```js
destination(point1, distance, bearing, units)
```

###Example

```javascript
var destination = require('turf-destination')
var point = require('turf-point')

var point1 = point(-75.343, 39.984)
var distance = 100
var bearing = 90
var units = 'miles' // or 'kilometers', 'degrees', 'radians'

var destination = destination(point1, distance, bearing, units)

console.log(destination)
```
