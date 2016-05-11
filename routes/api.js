/**
 * Created by zhangyida on 16/5/11.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    console.log('api work!')
});

module.exports = router;