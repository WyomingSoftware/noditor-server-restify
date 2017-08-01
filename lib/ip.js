
var restify = require('restify');
var IP = function () {};
var catchMsg = '/ip > There was a problem with the endpoint. It was not you. It has been logged and will be looked at.';



IP.prototype.get = function (req, res, next) {
    try{
        res.send(200, {'ip':req.connection.remoteAddress} );
        return next();
    }
    catch(err){
        console.log('Server >',err);
        return next(new restify.errors.InternalServerError(catchMsg));
    }
};



// Export an anonymous object
module.exports = new IP();
