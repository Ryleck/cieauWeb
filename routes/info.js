/**
 * Created by Phil on 2014-11-22.
 */
var express = require('express');
var router = express.Router();

/* GET info page. */
router.get('/', function(req, res) {
    res.render('info', { title: 'Informations' });
});


module.exports = router;