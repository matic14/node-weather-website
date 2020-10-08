const request = require('postman-request');

const geoCode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?limit=1&access_token=pk.eyJ1IjoicHJhc2hhbnRwYXRpZGFyMTQiLCJhIjoiY2tnMGVjOHhyMGNpZjJybGJvZnRyZmh1NCJ9.lPnGCfzZCBtdI_NkwgzlCA';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to geoCode Service', undefined);
		} else if (body.features.length === 0) {
			callback('unable to find the location', undefined);
		} else {
			const { center, place_name } = body.features[0];
			callback(undefined, {
				lat   : center[1],
				lon   : center[0],
				place : place_name
			});
		}
	});
};

module.exports = geoCode;
