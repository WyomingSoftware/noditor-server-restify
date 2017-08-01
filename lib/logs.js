var restify = require('restify');
var VALIDATE = require('./validate');
var DBS = require('./dbs');

var LOGS = function () {
    var catchMsg = '/log > There was a problem with the endpoint. It was not you. It has been logged and will be looked at.';
    var dbStats;
    var poolSize = 15;
};


LOGS.prototype.set = function (req, res, next) {
    try{
        console.log('Server > (POST) /logs', req.connection.remoteAddress);
        var headerKeys = VALIDATE.requestPost(req, res, next);
        if(headerKeys){
            res.send(201, {'_id':'UYT-88765-HGFG-UY765', what_u_sent:JSON.parse(req.body)} );
            return next();
        }
    }
    catch(err){
        console.log('Server > LOGS.prototype.set:',err);
        return next(new restify.errors.InternalServerError(catchMsg));
    }
};


// Export an anonymous object
module.exports = new LOGS();
