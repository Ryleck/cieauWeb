/**
 * Created by Phil on 2014-12-30.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/fileUpload', function(req, res) {
    res.render('fileUpload');
});

module.exports = router;