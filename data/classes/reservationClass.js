const fs = require('fs');
const reservationStorage = JSON.parse(fs.readFileSync('/Users/alexandral.gonzalez/Desktop/Godk4/data/reservations.json', "utf8"));


class Reservations{
    constructor(ReservationID, clientID, date, hotelName, price, balance){
        this.ReservationID = ReservationID,
        this.clientID = clientID, 
        this.date = date,
        this.hotelName = hotelName,
        this.price = price, 
        this.balance = balance
    }
    getReservations() {
        let names = [];
        for(let i=0; i<reservationStorage.length; i++){
            names.push(reservationStorage[i].hotelName);
         }
         return names;
    }
    getSpecificReservation(id) {
        for(let i=0; i<reservationStorage.length; i++){
            if(reservationStorage[i].ReservationID == id){
                return JSON.stringify(reservationStorage[i]);      
            } 
       } return "No such Booking in database";
       
    }
    postReservation(payload){
        reservationStorage.push(payload); // skubber brugeren ind i storage objektet
        //Skriver i filen user.json (DB) og laver vores storage om til JSON format således vi kan skrive brugeren ind der også er lavet om til JSON  
        fs.writeFile('/Users/alexandral.gonzalez/Desktop/Godk4/data/reservations.json', JSON.stringify(reservationStorage, null, 2), ()=> {
        
        });
        return(payload.ReservationID + " " + payload.hotelName + " Has been added to database");
    }
    deleteReservation(id){
        for(let i=0; i<reservationStorage.length; i++){
            if(reservationStorage[i].ReservationID == id){    
                reservationStorage.splice(i,1);
                // laver vores storage object til  string og indsætter i JSON   
                    fs.writeFile('/Users/alexandral.gonzalez/Desktop/Godk4/data/reservations.json', JSON.stringify(reservationStorage, null, 2), () => {
                    });
                return "reservation with this id: " + id + "has been deleted";
            } 
        } return "Reservation wasnt found";
    }
    updReservation(payload){
        

        let id = payload.ReservationID;
        let clientsID = payload.clientID;
        let stamp = payload.date;
        let name = payload.hotelName;
        let cost = payload.price;    
        let left = payload.balance;   

        console.log(payload.clientID);
       
        //const storage = JSON.parse(fs.readFileSync('user.json'))
        const findBooking = reservationStorage.find((booking)=>  booking.ReservationID == id);
        

        if(clientsID) {
            findBooking.clientID = clientsID;
        };
        if(stamp) {
            findBooking.date = stamp;
        };
        if(name) {
            findBooking.hotelName = name;
        };
        if(cost) {
            findBooking.price = cost;
        };
        if(left) {
            findBooking.balance = left;
        };
      // OBS FIND UD AF HVORFOR NEDENSTÅENDE VIRKER!!!!
        let bookingStorage = JSON.stringify(reservationStorage, null, 2);
        fs.writeFileSync('/Users/alexandral.gonzalez/Desktop/Godk4/data/reservations.json', bookingStorage, 'utf8')
        
        return "Reservation with id: " + id + " has been updated"
        // res.send("The profile has been updayed")
        // console.log("Client with id: " + id + " has been updated");
    }
};

module.exports = {Reservations};