const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2t5bGVyMjQzNyIsImEiOiJjazVic21sdnUxZWIyM2dvMzNlZ3A3NmcyIn0.IPB1d-OHfv7xZi-n6oVoTA&limit=1'

    request({url, json: true}, (error, {body}) => {
      if (error) {
        callback('Unable to connect to location services!', undefined)
      } else if (body.features.length === 0) {
        callback ('Unable to find location. Try another search.', undefined)
      } else {
        callback(undefined, {
          longitude: body.features[0].geometry.coordinates[1],
          latitude: body.features[0].geometry.coordinates[0]
          }
        )}
    })

  }

  module.exports = geocode
