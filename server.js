const express = require('express');
const server = express();
var ip = "127.0.0.1";
let port = process.argv.splice(2)[0]; //gemmer 3. argument som portnr.

const fs = require('fs');
let storage = fs.readFileSync('./storage.json', "utf8");
let reservations = JSON.parse(storage); //henter og gemmer data fra JSON-filen

server.get('/', (req, res) => { 
    res.end("Package recieved on port: " + port);
    console.log("Package recieved on port: " + port);
});

server.get('/reservations', (req, res) => { //viser liste over samlede reservationer
    res.send(reservations);
    console.log("Package recieved on port: " + port);
});

server.get('/reservations/:id', (req, res) => { //viser specifik reservation
	const id = req.params.id;
	const specificReservation = reservations.find((reservation) => reservation.id == id);
    res.send(specificReservation);
    console.log("Package recieved on port: " + port);
});

server.listen(port, ip, function() { //gælder ikke load balancer, kun servers
    console.log("Server is listening on: " + port)
});


