
const https =require('https');
const fs =require('fs');
const axios = require('axios');
const path = require('path');

// FIXING AXIOS and SSL cert
  // https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate


//  https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/?fbclid=IwAR2EOO_NyZiPqL4Hc_pIkVZaJ-i_xYslzJPYvM19PzHijc9_4lgH7HT-B60#installing

const agent = new https.Agent({
    rejectUnauthorized: false, // (NOTE: this will disable client verification)
    key: fs.readFileSync(path.join(__dirname, '../cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert', 'cert.pem')),
    passphrase: "YYY"
})

axios.all([
    axios.get('https://localhost:8000/clients',{ httpsAgent: agent }),
    axios.get('https://localhost:8000/clients/3',{ httpsAgent: agent }),
    axios.post('https://localhost:8000/clients', {
        clientID: '10',
        firstName: 'Carin',
        lastName: 'Lemvig',
        streetAddress: 'Skeller',
        city: 'Skelskær'
      }, { httpsAgent: agent }),
         axios.patch('https://localhost:8000/clients/7', {
        clientID: '7',
        firstName: 'Peter',
        lastName: 'Jensen',
        streetAddress: 'Hyldespjældet',
        city: 'Albertslund'
      }, { httpsAgent: agent }),
      axios.delete('https://localhost:8000/clients/8',{ httpsAgent: agent })

]).then(axios.spread((getClients, getClient, postClient, updClient, deleteClient) => {
    console.log(getClients.data);
    console.log(getClient.data);
    console.log(postClient.data);
    console.log(updClient.data);
    console.log(deleteClient.data);

})).catch(function (error) {
    // handle error
        console.log(error.message);
});


    // axios.get('https://localhost:8000/clients',{ httpsAgent: agent })
    // .then( function(response){
    //     console.log(response.data);
    //     // console.log(response.status)
    // }).catch(function (error) {
    // // handle error
    //     console.log(error.message);
    // });

    // axios.get('https://localhost:8000/clients/2',{ httpsAgent: agent })
    // .then( function(response){
    //     console.log(response.data);
    //     // console.log(response.status)
    // }).catch(function (error) {
    // // handle error
    //     console.log(error.message);
    // });

    // axios.post('https://localhost:8000/clients', {
    //     clientID: '8',
    //     firstName: 'SEX',
    //     lastName: 'SEXT',
    //     streetAddress: 'FISSE',
    //     city: 'FIISSSSEEEE'
    //   }, { httpsAgent: agent })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });

    //   axios.patch('https://localhost:8000/clients/7', {
    //     clientID: '7',
    //     firstName: 'egon',
    //     lastName: 'Jensen',
    //     streetAddress: 'egon',
    //     city: 'Albertslund'
    //   }, { httpsAgent: agent })
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //   });
    // axios.delete('https://localhost:8000/clients/8',{ httpsAgent: agent })
    // .then( function(response){
    //     console.log(response.data);
    //     // console.log(response.status)
    // }).catch(function (error) {
    // // handle error
    //     console.log(error.message);
    // });


// //https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/?fbclid=IwAR0-TOfGnMI06R8uXTJh32YL9dAFl1dWeRZAICKQeUQkKLe9ZSCpj6G7IsU#installing


