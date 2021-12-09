
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

setTimeout(() => {

// ======================= USING axios req individually - some divided in functions =======================//
function updclient(){
    setTimeout(async function(){
        try {
            let upd =  await axios.patch('https://localhost:8000/clients/3', {
                    "firstName": "Laura",
                    "lastName": "Boejer",
                    "streetAddress": "Vissensvej",
                    "City": "Kbh Ø"
            }, { httpsAgent: agent });
            // console.log("Opdatere bruger")
            return console.log( upd.data)
        } catch (error){
            console.log(error);
        }}, 4500)
};
updclient();

axios.get('https://localhost:8000/clients',{ httpsAgent: agent })
    .then( function(response){
        console.log(response.data);
        // console.log(response.status)
    }).catch(function (error) {
    // handle error
        console.log(error.message);
    });

    axios.get('https://localhost:8000/clients/2',{ httpsAgent: agent })
    .then( function(response){
        console.log(response.data);
        // console.log(response.status)
    }).catch(function (error) {
    // handle error
        console.log(error.message);
    });

    axios.post('https://localhost:8000/clients', {
        clientID: '4',
        firstName: 'Nico',
        lastName: 'Jensen',
        streetAddress: 'Vingede',
        city: 'Hellerup'
      }, { httpsAgent: agent })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });

    function delClient(){
        setTimeout(async function(){
            try {
                let remove =  await  axios.delete('https://localhost:8000/clients/5',{ httpsAgent: agent })
                        
                // console.log("sletter bruger")
                return console.log( remove.data)
            } catch (error){
                console.log(error);
            }}, 3500)
    };
  delClient();


}, 2500)


