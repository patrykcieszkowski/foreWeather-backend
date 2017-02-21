var http = require('http')

function GoogleMaps() {}

GoogleMaps.prototype.geoCode = function(options, callback)
{
  var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${options.location}&sensor=true`
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

module.exports = GoogleMaps
