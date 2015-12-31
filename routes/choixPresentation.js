/**
 * Created by Phil on 2014-12-08.
 */
var express = require('express');
var router = express.Router();

/* GET info page. */
router.get('/', function(req, res) {
    res.render('choixPresentation', { title: 'C.I.EAU' });
});

module.exports = router;