const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const weatherInfo = require('./utils/weatherInfo');

const app = express();

const port = process.env.PORT || 3000;

// ------------------define path of express config------
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
//----------HandleBars config
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

// -------------------ROUTES---------------------------

app.get('', (req, res) => {
	res.render('index', {
		title : 'Weather',
		name  : 'Prashant'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title : 'About Page',
		name  : 'Prashant'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title : 'Help Page',
		name  : 'Prashant'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			message : 'Please provide a address..'
		});
	}
	console.log('Getting result...');
	geoCode(req.query.address, (error, { lat, lon, place } = {}) => {
		if (error) {
			return res.send({
				error : error
			});
		}

		weatherInfo(lat, lon, (error, weatherData) => {
			if (error) {
				console.log(error);
				return res.send({
					error : error
				});
			}
			const { forecast } = weatherData;
			res.send({
				forecast,
				location : place,
				address  : req.query.address
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title        : '404',
		errorMessage : 'the help page is not found..',
		name         : 'Prashant'
	});
});

app.get('*', (req, res) => {
	res.render('error', {
		title        : '404',
		errorMessage : 'the page is not found..',
		name         : 'Prashant'
	});
});

app.listen(port, () => {
	console.log('App is listening of port ' + port);
});
