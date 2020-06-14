const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bd504856a614463a236385b60c91c991&query=' + latitude + ',' + longtitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                precip: body.current.precip
            })
        }
    })
}

module.exports = forecast