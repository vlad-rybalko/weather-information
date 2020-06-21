const rp = require('request-promise')

module.exports = async function(city = '') {
    if (!city) {
        throw new Error('Имя города не может быть пустым')
    }

    const KEY = 'a447f749d469d6085efea85065618cec'
    const uri = 'http://api.openweathermap.org/data/2.5/weather'

    const options = {
        uri,
        qs: {
           appid: KEY,
           q: city,
           units: 'imptrial'
        },
        json: true
    }

    try {
        const data = await rp(options)
        const celsius = data.main.temp - 273

        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }

    } catch (error) {
        //console.log(error)
        return {
            weather: null,
            error: error.error.message
        }
    }
}