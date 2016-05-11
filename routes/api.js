/**
 * Created by zhangyida on 16/5/11.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');
var fs = require('fs');
var router = express.Router();


router.get('/', function (req, res, next) {
    //在这里我们进行爬虫

    var baseUrl = 'http://www.superbrandmall.com/sbm/';
    superagent.get('http://www.superbrandmall.com/sbm/share?mode=e')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }

            var $ = cheerio.load(sres.text);
            var items = [];

            //遍历所有的div快对其进行过滤得到标题和链接
            [].forEach.call($('.share-box'), function (element, index) {
                items.push({
                    "title": $(element).find('h1')[0].children[0].data,
                    "url": baseUrl + $(element).find('p.bttn-share-view-all').find('a').attr('href')
                })
            });
            res.send(items);
        });
});

module.exports = router;