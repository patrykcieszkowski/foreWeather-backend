var http = require('http')

var unitList = [
  {name: 'Kelvin', short: 'K', code: 'default'},
  {name: 'Celsius', short: 'C', code: 'metric'},
  {name: 'Fahrenheit', short: 'F', code: 'imperial'}
]

function Weather(options) {
  var _apikey = null
  var _unit = 0

  if (options)
  {
    _apikey = options.api || process.env.OWM_APIKEY
    if (options.unit
      && typeof options.unit === 'number'
      && unitList[options.unit])
    {
      _unit = options.unit
    }
  }

  Object.defineProperty(this, 'APIKEY', {
    get: function() { return _apikey },
    set: function(value) { _apikey = value }
  })

  Object.defineProperty(this, 'unit', {
    get: function() { return unitList[_unit] },
    set: function(value) {
      for (var i = 0; i < unitList.length; i++)
      {
        if (i == value) _unit = i
      }
      return _unit
    }
  })
}

Weather.prototype.getNow = function(options, callback) {
  var url = `http://api.openweathermap.org/data/2.5/weather?appid=${this.APIKEY}&q=${options.location}&units=${this.unit.code}`
  http.get(url, function(res)
  {
    var content = ''
    res.on("data", function(chunk)
    {
      content += chunk
    })

    res.on('end', function()
    {
      return callback(res, JSON.parse(content))
    })
  })
}

Weather.prototype.foreCast = function(options, callback) {
  var url = `http://api.openweathermap.org/data/2.5/forecast?appid=${this.APIKEY}&q=${options.location}&units=${this.unit.code}`
  http.get(url, function(res)
  {
    var content = ''
    res.on('data', function(chunk)
    {
      content += chunk
    })

    res.on('end', function()
    {
      return callback(res, JSON.parse(content))
    })
  })
}

module.exports = Weather
