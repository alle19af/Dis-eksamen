# Dis eksamen
 
Denne opgave er udarbejdet af Alexandra Gonzalez (studienr.: 137891)

Opsætning: Til udarbejdelsen af applikationen er gjort at følgende libraries: 
- axios
- express
- http-proxy
- nodemon
- request

Applikationen består af:
- 2 filer i yderste mappelag: 
    - en serverfil, samt en load-balancer-fil. I server filen bruges 'progress.argv.splice(2)[0]', som sender det argument der skrives i kommandolinjen (efter stien til Node.JS og stien til scriptkoden) som port for server der startes.
- 3 mapper i yderste mappelag: 
    - cert: Her ligger hhv. nøglen og certifikatet til brug for den krypterede linje
    - data: Består af klasserne hhv. client og reservation og Storage/ Database, som her består af 2 JSON filer
    - request: Som benyttes som klienten der sender request til applikationen, den er opdelt i hhv. client- og reservation- req.js

Applikationen er udarbejdet med udgangspunkt i følende links:
https://www.youtube.com/watch?v=aoywuDgapzo
https://github.com/masungwon/techtalk-demo
https://stackoverflow.com/questions/51363855/how-to-configure-axios-to-use-ssl-certificate
https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/?fbclid=IwAR0-

Vejledning: 
Hele applikationen køres med "npm start" i kommandofeltet. Hvordan dette er sat op kan ses i package.json filen.

npm start medfører aktivering af load balanceren der køres på port 8000, serveren på port 8001, 8002, 8003 og 8004.

Da hele applikationen køres med npm start, aktivere også vores "klient", som sender hhv. get, post, patch og delete request til applikationen.
Deres output ses i terminalen og her mødes brugeren med en besked om, hvilken port forespørgslen er videresendt til.
Således vi kan følge med i hele processen.