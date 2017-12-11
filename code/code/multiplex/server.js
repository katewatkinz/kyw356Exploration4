var express             = require('express');
var sockjs              = require('sockjs');

var websocket_multiplex = require('websocket-multiplex');


var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
var service = sockjs.createServer(sockjs_opts);

var multiplexer = new websocket_multiplex.MultiplexServer(service);

var kate1 = multiplexer.registerChannel('kate1');
kate1.on('connection', function(conn) {
    conn.write(' ');
    conn.on('data', function(data) {
        conn.write('' + data);
    });
});

var otherRobot = multiplexer.registerChannel('otherRobot');
otherRobot.on('connection', function(conn) {
    conn.write(' ');
    conn.on('data', function(data) {
        conn.write(' ' + data);
    });
});

var CAAARRRRAAAALL = multiplexer.registerChannel('CAAARRRRAAAALL');
CAAARRRRAAAALL.on('connection', function(conn) {
    conn.write('');
    conn.on('data', function(data) {
        conn.write(' ' + data);
    });
    // Explicitly cancel connection
    //conn.end();
});


var CAARRRLLLLLJR = multiplexer.registerChannel('CAARRRLLLLLJR');
CAARRRLLLLLJR.on('connection', function(conn) {
    conn.write('');

    conn.end();
});


var app = express.createServer();
service.installHandlers(app, {prefix:'/multiplex'});

console.log(' [*] Listening on 0.0.0.0:9999' );
app.listen(9999, '0.0.0.0');

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/multiplex.js', function (req, res) {
    res.sendfile(__dirname + '/multiplex.js');
});
