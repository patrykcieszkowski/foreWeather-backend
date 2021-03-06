var express = require('express')
var router = express.Router()
var apicache = require('apicache')
var cacheMw = apicache.middleware

var weatherLib = require('../lib/weather.js')
var Weather = new weatherLib({ unit: 1 })

router.get('/weather', cacheMw('1 hour'), function(req, res)
{
  if (!req.query.location)
  {
    return res.status(404).json({statusCode: 404})
  }

  Weather.getNow({ location: req.query.location }, function(response, body)
  {
    return res.status(200).json(body)
  })
})

router.get('/forecast', cacheMw('3 hours'), function(req, res)
{
  if (!req.query.location)
  {
    return res.status(404).json({statusCode: 404})
  }

  Weather.foreCast({ location: req.query.location }, function(response, body)
  {
    return res.status(200).json(body)
  })
})

module.exports = router
