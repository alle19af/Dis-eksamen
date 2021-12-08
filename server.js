// Bibliotek
const express = require('express');
const fs = require('fs');

// Variables for servere
const server = express();
var ip = "127.0.0.1";
let port = process.argv.splice(2)[0]; //gemmer 4. argument som portnr.

//Klasserne instansieres
let   {Clients}  = require('./data/classes/clientClass');
let newClient = new Clients;
let   {Reservations}  = require('./data/classes/reservationClass');
let newBooking = new Reservations;

// Genkender request objektet som JSON objekt
server.use(express.json());

// 01. ------------------- CRUD CLIENTS -----------------------//
server.get('/clients', (req, res) => { //viser liste over samlede reservationer
    console.log("Package recieved on port: " + port);
    res.send(newClient.getClients());
});

server.get('/clients/:clientID', (req, res) => { //viser specifik reservation
	const id = req.params.clientID;
    console.log("Package recieved on port: " + port);
    res.send(newClient.getSpecificClient(id));
});

server.post('/clients', (req, res) => { 
    let payload = req.body;
    console.log("Package recieved on port: " + port);
    res.send(newClient.postClient(payload));

});

server.patch('/clients/:clientID', (req, res) => { 
    const id = req.params.clientID;
    let payload = new Clients(id,req.body.firstName, req.body.lastName, req.body.streetAddress, req.body.city); 
    console.log("Package recieved on port: " + port);
    res.send(newClient.updateClient(payload));
});

server.delete('/clients/:clientID', (req, res) => {
    const prop = req.params.clientID;
    console.log("Package recieved on port: " + port);
    res.send(newClient.deleteClient(prop));
});


// 02. ---------------- CRUD RESERVATIONS ----------------------- //
server.get('/reservations', (req, res) => { //viser liste over samlede reservationer
    console.log("Package recieved on port: " + port);
    res.send(newBooking.getReservations());
});

server.get('/reservations/:ReservationID', (req, res) => { //viser specifik reservation
    const id = req.params.ReservationID;
    console.log("Package recieved on port: " + port);
    res.send(newBooking.getSpecificReservation(id));
});

server.post('/reservations', (req, res) => { 
    const id = req.body;
    console.log("Package recieved on port: " + port);
    res.send(newBooking.postReservation(id));
});
  
server.patch('/reservations/:ReservationID', (req, res) => { 
    const id = req.params.ReservationID;
    let payload = new Reservations(id,req.body.clientID, req.body.data, req.body.hotelName, req.body.price, req.body.balance); 
    console.log("Package recieved on port: " + port);
    res.send(newBooking.updReservation(payload));
});

server.delete('/reservations/:ReservationID', (req, res) => {
    const prop = req.params.ReservationID;
    console.log("Package recieved on port: " + port);
    res.send(newBooking.deleteReservation(prop));
});


// Server igangsætter en "listener" på port og ip ...
server.listen(port, ip, function() { //gælder ikke load balancer, kun servers
    console.log("Secure server is listening on: " + port)
});




