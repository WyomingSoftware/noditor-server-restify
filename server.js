var noditor = require('noditor');
var restify = require('restify');

// Restify
var server = restify.createServer({
  name: 'Noditor Server using Restify'
});

// Add the endpoint needed by the Noditor Mobile App
server.get('/noditor/:path/:passcode/:command', noditor.commands);

// Start Restify
server.listen(8080, function () {
    console.log('Server > '+server.name+' started @'+new Date());
    console.log('Server > '+server.url);
    var options = {"quiet":false};
    noditor.start(options);
});
