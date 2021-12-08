// Libraries used
const express = require('express');
const https =require('https');
const fs = require('fs');
const path = require('path')

// Creating variabels for server instans
const server = express();
var ip = "127.0.0.1";
let port = process.argv.splice(2)[0]; //property returns an array containing the command-line arguments passed

// launching a proxy server thats gonna act like a load balancer
const proxy = require('http-proxy')
const proxyServer = proxy.createServer();


// Register the server instancens , an array of server adrreses
let urls = [
    {
        host: "localhost",
        port: 8001
    },
    {
        host: "localhost",
        port: 8002
    },
    {
        host: "localhost",
        port: 8003
    },
    {
        host: "localhost",
        port: 8004
    }
];

// Creating the key and certificate as an object, to be used in our loadbalancer
let option = {
    // appl. should not start before - which is why we use readfileSync
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}

// Creating the load balancer that distributes work load to server instances from URL array
loadBalancer = https.createServer(option, function(req, res) {
    // console.log("Received")
    // On each request, grab a server from the URL list
    let target = {
        target: urls.shift()
    };

    //Proxy to the server whos turn it is
   
    proxyServer.web(req, res, target);
    console.log("Load balancer sent request to: http://" + target.target.host + ":" + target.target.port);
    // And then the server u just used becomes the last item on the liSt, SO IT CAN BE REUSED in the url array
    urls.push(target.target);
    process.on('uncaughtException', err => {
        console.error(err.message, 'Uncaught Exception thrown');
        process.exit(1);
      });
    

});


loadBalancer.listen(port, ip, function() {
        console.log("Load balancer is listening on port: " + port);
});


