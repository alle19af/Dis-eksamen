const express = require('express');
const server = express();
let httpProxy = require('http-proxy');
let port = process.argv.splice(2)[0];

const proxy = httpProxy.createServer();

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

loadBalancer = server.get('*', function(req, res) {
    let target = {
        target: urls.shift()
    };
    console.log("Load balancer sent request to: http://" + target.target.host + ":" + target.target.port);
    proxy.web(req, res, target);
    urls.push(target.target);
});

loadBalancer.listen(port || 8000, function() {
    if (port == 8000) {
        console.log("Load balancer is listening on port: " + port)
    } else {
        console.log("Server is listening on: " + port)
    }
}); 