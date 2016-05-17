/**
 * Created by zhangyida on 16/5/11.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var Content = require("../models/content");


router.route('/').get( function (req, res, next) {
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
                });
            });
            res.send(items);
           // res.redirect(307, 'api/content');
        });

});

/**
 * gaorui 2016.5.16
 * 循环讲数据存入到mongo中
 */
router.route("/testPost")
    .get(function (req,res,next) {
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
                    });

                    var content = new Content({
                        "title": $(element).find('h1')[0].children[0].data,
                        "url": baseUrl + $(element).find('p.bttn-share-view-all').find('a').attr('href')
                    });

                    content.save(function (err) {
                        if (err) {
                            return res.send(err);
                        }
                        //res.send({message: 'connect Added'});
                    });
                });
                res.send(items);
            });

    })


/**
 * 测试使用
 */
router.route('/content')
    .post(function (req, res) {
        //var docs []bson.M = ;
        var content = new Content(req.body);
        //col := Content("aaaaaa");
        content.save(function (err) {
            if (err) {
                return res.send(err);
            }
            res.send({message: 'connect Added'});
        });
    })
    .get(function (req, res) {
        Content.find(function (err,content) {
        if (err) {
            return res.send(err);
        }
        res.json(content);
    });
});




module.exports = router;