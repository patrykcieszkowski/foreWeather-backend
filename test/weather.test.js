var weatherLib = require('../lib/weather.js')

var chai = require('chai')
var expect = chai.expect

describe('Weather Lib', function()
{
  var Weather = new weatherLib({ api: '<OPEN_WEATHER_KEY>' })
  describe("getNow()", function()
  {
    it("should return current weather at Hatfield, Herts", function(done)
    {
      Weather.getNow({ location: 'Hatfield,Herts' }, function(response, body)
      {
        expect(response.statusCode).to.equal(200)
        expect(response).to.be.an('object')
        done()
      })
    })
  })

  describe('foreCast()', function()
  {
    it("should return weather for the next 5 days at Hatfield, Herts", function(done)
    {
      Weather.foreCast({ location: 'Hatfield,Herts' }, function(response, body)
      {
        expect(response.statusCode).to.equal(200)
        expect(response).to.be.an('object')
        done()
      })
    })
  })

  describe('set unit (success)', function()
  {
    it("should set temp unit to Celsius (Metric)", function(done)
    {
      Weather.unit = 1
      expect(Weather.unit).to.have.property('code', 'metric')
      done()
    })
  })
})
