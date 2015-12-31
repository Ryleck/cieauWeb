/**
 * Created by Phil on 2014-11-23.
 */
var express = require('express');
var router = express.Router();

/* GET procedes page. */
router.get('/', function(req, res) {
    res.render('procedes', { title: 'C.I.EAU' });
});

module.exports = router;