var restify = require('restify');
var colors = require('colors');



var DBS = function () {};

DBS.poolSize = 10;
DBS.url_shard0 = 'mongodb://192.168.2.102:27017/noditor';
DBS.url_shard1 = 'mongodb://192.168.2.102:27017/noditor';
DBS.url_shard2 = 'mongodb://192.168.2.102:27017/noditor';
DBS.prototype.databases = {shard0:null, shard1:null};

DBS.prototype.startConnections = function () {
    try{
        console.log('Server > Opening connection pools.');
        var MongoClient = require('mongodb').MongoClient;
        var self = this;

        // SHARD 0
        MongoClient.connect(DBS.url_shard0, {poolSize: DBS.poolSize, ssl: false
        }, function(err, db) {
            if(err) console.error("Server > FAILED to open connection pool to MongoDB".red, err);
            else{
                console.log("Server > Connection pool opened to MongoDB for stats0 "+DBS.url_shard0+": pool size:", DBS.poolSize);
                self.databases.shard0 = db;
            }
        });

        // SHARD 1
        MongoClient.connect(DBS.url_shard1, {poolSize: DBS.poolSize, ssl: false
        }, function(err, db) {
            if(err) console.error("Server > FAILED to open connection pool to MongoDB".red, err);
            else{
                console.log("Server > Connection pool opened to MongoDB for stats1 "+DBS.url_shard1+": pool size:", DBS.poolSize);
                self.databases.shard1 = db;
            }
        });
    }
    catch(err){
        console.error("Server > DBS.prototype.init".red, err);
    }
};


// Export an anonymous object
module.exports = new DBS();
