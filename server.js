var noditor = require('../noditor');
var restify = require('restify');

// Restify
var server = restify.createServer({
  name: 'Noditor Server using Restify'
});
/*server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
*/

server.get('/noditor/:passcode/:command', noditor.commands);

server.listen(8080, function () {
    console.log('Server > '+server.name+' started @'+new Date());
    console.log('Server > '+server.url);
    var options = {"quiet":false};
    noditor.start(options);
});
