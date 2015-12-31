/**
 * Created by Phil on 2014-12-08.
 */
var express = require('express');
var router = express.Router();
var ls = require('../node_modules/listeFichiers/listeFichiers');

router.get('/', function(req, res) {
    console.log(req);
    var fichiers = ls.listeFichiersHTML();
    res.render('presentationExistantes', { title: 'Liste des présentations', blockFichiers: fichiers });
});

module.exports = router;