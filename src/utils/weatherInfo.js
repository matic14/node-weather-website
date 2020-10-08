const request = require('postman-request');

const weatherInfo = (lat, lon, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=9fef13bd5a987349ed0386131ba844f2&query=' +
		encodeURIComponent(lat) +
		',' +
		encodeURIComponent(lon);

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weatherService', undefined);
		} else if (body.success === false) {
			callback('Unable to find location', undefined);
		} else {
			const { temperature, precip, weather_descriptions } = body.current;
			// 		console.log(weatherData.temperature, weatherData.feelslike);

			const forecast = `${weather_descriptions}..  It is currently ${temperature} degrees out. There is a ${precip} chance of rain`;
			callback(undefined, {
				forecast
			});
		}
	});
};

module.exports = weatherInfo;
