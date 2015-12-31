/**
 * Created by Phil on 2014-11-22.
 */
var express = require('express');
var router = express.Router();

/* GET source page. */
router.get('/', function(req, res) {
    res.render('source', { title: 'Source' });
});

module.exports = router;