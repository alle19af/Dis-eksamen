const fs = require('fs');
const clientStorage = JSON.parse(fs.readFileSync('/Users/alexandral.gonzalez/Desktop/Godk4/data/client.json', "utf-8"));



class Clients{ 
    constructor(clientID, firstName, lastName, streetAddress, City){
        this.clientID = clientID,
        this.firstName = firstName,
        this.lastName = lastName,
        this.streetAddress = streetAddress,
        this.City = City
    }
    getClients() {
        let names = [];
        for(let i=0; i<clientStorage.length; i++){
            names.push(clientStorage[i].firstName);
         }
         return names;
    }
    getSpecificClient(id) {
        for(let i=0; i<clientStorage.length; i++){
            if(clientStorage[i].clientID == id){
                return JSON.stringify(clientStorage[i]);      
            } 
       } return "No such Clients";
       
    }
    postClient(payload){
        clientStorage.push(payload); // skubber brugeren ind i storage objektet
        //Skriver i filen user.json (DB) og laver vores storage om til JSON format således vi kan skrive brugeren ind der også er lavet om til JSON  
        fs.writeFile('/Users/alexandral.gonzalez/Desktop/Godk4/data/client.json', JSON.stringify(clientStorage, null, 2), ()=> {
        console.log("Writing in file");
        });
        return(payload.firstName + " " + payload.lastName + " Has been added to database");
    }
    deleteClient(id){
        for(let i=0; i<clientStorage.length; i++){
            if(clientStorage[i].clientID == id){
    
                clientStorage.splice(i,1);
              
                // laver vores storage object til  string og indsætter i JSON   
                    fs.writeFile('/Users/alexandral.gonzalez/Desktop/Godk4/data/client.json', JSON.stringify(clientStorage, null, 2), () => {
                           
                    });
                    console.log(clientStorage);
                return "Client with id: " + id  +  " has been deleted";
                
            } 
        } return "Client wasnt found";
    }
    updateClient(payload){
        console.log(payload);

        let id = payload.clientID;
        let firstname = payload.firstName;
        let lastname = payload.lastName;
        let adress = payload.streetAddress;
        let town = payload.City;
       
       
        //const storage = JSON.parse(fs.readFileSync('user.json'))
        const findClient = clientStorage.find((user)=>   user.clientID == id);

        if(firstname) {
            findClient.firstName = firstname;
        };
        if(lastname) {
            findClient.lastName = lastname;
        };
        if(adress) {
            findClient.streetAddress = adress;
        };
        if(town) {
            findClient.City = town;
        };
      // OBS FIND UD AF HVORFOR NEDENSTÅENDE VIRKER!!!!
        let userStorage = JSON.stringify(clientStorage, null, 2);
        fs.writeFileSync('/Users/alexandral.gonzalez/Desktop/Godk4/data/client.json', userStorage, 'utf8')
        
        return "Client with id: " + id + " has been updated"
        // res.send("The profile has been updayed")
        // console.log("Client with id: " + id + " has been updated");
    }
}

module.exports = {Clients};