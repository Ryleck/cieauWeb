/**
 * Created by Phil on 2014-12-09.
 */
var express = require('express');
var router = express.Router();

/* GET revision page. */
router.get('/', function(req, res) {
    res.render('revision', { title: 'C.I.EAU' });
});

module.exports = router;