/**
 * Created by zhangyida on 16/5/11.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');
var fs = require('fs');
var router = express.Router();


router.get('/', function (req, res, next) {
    console.log('start');
    next();
}, function (req, res, next) {
    //在这里我们进行爬虫
    superagent.get('http://www.superbrandmall.com/sbm/share?mode=e')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var items = [];            [].forEach.call($('.share-box').find('h1'), function (index, item) {
                items.push(index.children[0].data);
            });
            res.send(items);
        });

});

module.exports = router;