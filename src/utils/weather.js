const request = require('request')

const weather = (location, callback) => {
    const url = 'https://api.darksky.net/forecast/c33bde4bdeec34133a9721af18aa194d/' + location.longitude + ',' + location.latitude

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to services', undefined)
        } else if (body.code) {
            callback('Incorrect Data. Try again.', undefined)
        } else {
            callback(undefined, body.currently)
        }
    })
}


module.exports = weather
