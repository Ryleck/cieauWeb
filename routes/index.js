var express = require('express');
var router = express.Router();
var presentation = require('../node_modules/presentation/presentation');

/* GET home page. */
router.get('/', function(req, res) {
  var indice = presentation.addVar(req.ip);
  res.render('index', { title: 'C.I.EAU', valeurIndex: indice});
});

module.exports = router;
