const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: 'Wtuf5US4OGAIFHdjc0xdhdO2lZxBkAIo',
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;