var googleMapsLib = require('../lib/google_maps')

var chai = require('chai')
var expect = chai.expect

describe("Google Maps", function()
{
  var GoogleMaps = new googleMapsLib()
  describe("geoCode()", function()
  {
    it("should return GEO result for Hatfield,Herts", function(done)
    {
      GoogleMaps.geoCode({ location: 'Hatfield,Herts' }, function(response, body)
      {
        expect(response.statusCode).to.equal(200)
        expect(body).to.have.property('status', 'OK')
        done()
      })
    })
  })
})
