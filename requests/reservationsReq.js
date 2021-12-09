
const https =require('https');
const fs =require('fs');
const axios = require('axios');
const path = require('path');

//Using http.agent to get access from client to storage
const agent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem')),
    passphrase: "YYY"
});

setTimeout(()=> {
// ======================= USING axios req individually - some divided in functions =======================//
function upddBooking(){
    setTimeout(async function(){
        try {
            let upd =  await axios.patch('https://localhost:8000/reservations/0002', {
                "clientID": "2",
                "date": "24-11-2021",
                "hotelName": "Summer-Hotel",
                "price": "12000",
                "balance": "8000"
            }, { httpsAgent: agent });
            // console.log("Opdatere bruger")
            return console.log( upd.data)
        } catch (error){
            console.log(error);
        }}, 7000)
};
upddBooking();

axios.get('https://localhost:8000/reservations',{ httpsAgent: agent })
    .then( function(response){
        console.log(response.data);
    }).catch(function (error) {
    // handle error
        console.log(error.message);
    });

axios.get('https://localhost:8000/reservations/0003',{ httpsAgent: agent })
    .then( function(response){
        console.log(response.data);
    }).catch(function (error) {
    // handle error
        console.log(error.message);
    });

axios.post('https://localhost:8000/reservations', {
        "ReservationID": "0004",
        "clientID": "4",
        "date": "30-07-2027",
        "hotelName": "SunnyBeach",
        "price": "2700",
        "balance": "200"
      }, { httpsAgent: agent })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });

function delBooking(){
    setTimeout(async function(){
        try {
            let remove =  await  axios.delete('https://localhost:8000/reservations/0005',{ httpsAgent: agent })
            return console.log( remove.data)
        } catch (error){
            console.log(error);
        }}, 6000)
};
delBooking();



}, 5000);

