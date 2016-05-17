/**
 * Created by IBM on 2016/5/16.
 */
var mongoose  = require("mongoose");
var Schema = mongoose.Schema;

var contentSchema = new Schema({
    title:String,
    url:String
});

module.exports = mongoose.model("Content",contentSchema);





