var restify = require('restify');
var colors = require('colors');
var VALIDATE = require('./validate');
var DBS = require('./dbs');


var STATS = function () {};

STATS.catchMsg = '/stats > There was a problem with the endpoint. It was not you. It has been logged and will be looked at.';

STATS.prototype.set = function (req, res, next) {
    try{

        var headerKeys = VALIDATE.requestPost(req, res, next);
        //console.log('\nServer > (POST) /stats\n', headerKeys);

        var data = JSON.parse(req.body);
        data.dttmServer = new Date();
        data.remoteAddress = req.connection.remoteAddress;
        data.localAddress = headerKeys.localAddress;
        data.secretKey = headerKeys.secretKey;
        data.appName = headerKeys.appName;

        console.log(data);

        // Insert a single document
        /*DBS.databases[headerKeys.shard].collection('statistics').insertOne(data, function(err, r) {
            if(err) console.error('Server > STATS.prototype.set.insertOne'.red, err);
            if(r.result.n !=1) console.log('Server > STATS.prototype.set.insertOne.result', 'Failed to insert a single document.');
        });*/

        // Let the client move on
        res.send(201, {'status':'OK'} );
        return next();
    }
    catch(err){
        console.error('Server > STATS.prototype.set (outer try block):'.red, err);
        return next(new restify.errors.InternalServerError(STATS.catchMsg));
    }
};


STATS.prototype.get = function (req, res, next) {
  return next(new restify.errors.NotAcceptableError("Testing-Testing."));
          //res.send({'stats':'Coming soon from MongoDB'});
          //return next();
};


// Export an anonymous object
module.exports = new STATS();
