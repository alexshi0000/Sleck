module.exports = (function() {
  'use strict';

  var externalRoutes = require('express').Router();

  app.get('/public/form_functions.js', (req, res) => {
    res.sendFile(__dirname + '/public/form_functions.js')
  })

  app.get('/public/index.css', (req, res) => {
    res.sendFile(__dirname + '/public/index.css') //damn dont forget the backslash
  })

  return externalRoutes;
})();
