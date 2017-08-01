var restify = require('restify');

var VALIDATE = function () {};


VALIDATE.prototype.requestPost = function (req, res, next) {
    try{
        var headerKeys = {
            secretKey:req.header('X-SECRET_KEY'),
            appName:req.header('X-APP_NAME'),
            localAddress:req.header('X-LOCAL_ADDRESS'),
            remoteAddress:req.connection.remoteAddress
        };

        // Make sure to kill the connection if someone tries to flood RAM!
        if (req.body.length > 10000) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            return next(new restify.errors.NotAcceptableError("VALIDATE: Are you messing with me?."));
        }
        else if(!headerKeys.secretKey || headerKeys.secretKey.length < 19){
            return next(new restify.errors.NotAcceptableError("VALIDATE: The secretKey is not long enough, 19+ characters are required."));
        }
        else if(!headerKeys.appName || headerKeys.appName.length < 2){
            return next(new restify.errors.NotAcceptableError("VALIDATE: The appName is not long enough, 2+ characters are required."));
        }
        else{
            return headerKeys;
        }
    }
    catch(err){
        err.location = 'VALIDATE.prototype.request';
        return next(new restify.errors.InternalServerError(err.toString()));
    }
};


// Export an anonymous object
module.exports = new VALIDATE();
