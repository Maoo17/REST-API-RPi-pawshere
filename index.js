/**
 * Main program to run a simple server that says Hello World.
 *
 */
"use strict";

// Get the module for http and store it in a variable
var http = require("http");

var ip = "127.0.0.1";
var port = 8000;
// Use the variable to create a server.
// The server executes the function for each request it receives.
http.createServer(function (req, res) {
    fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
}).listen(port, ip);

console.log("Server running at " + ip + ":" + port);
