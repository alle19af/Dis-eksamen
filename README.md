# GKOPG4
 
Gruppe: Denne godkendelsesopgave er udarbejdet i et samarbejde mellem:

Alexandra Gonzalez (studienr.: 137891)
Julie-Astrid Bønlykke (studienr.: 146041)
Lærke Stald Pedersen (studienr.: 143941)
Laura Bøjer (studienr.: 144984)
Opsætning: Til udarbejdelsen af applikationen er gjort at følgende to libraries: http og httoProxy, som installeres ved at køre kommandoerne 'npm i http http-proxy' i terminalen.

Applikationen består af to filer: en serverfil, samt en load-balancer-fil. I begge filer bruges 'progress.argv.splice(2)[0]', som sender det argument der skrives i kommandolinjen (efter stien til Node.JS og stien til scriptkoden) som port for server der startes.

Applikationen er udarbejdet med udgangspunkt i følende links:

https://www.youtube.com/watch?v=aoywuDgapzo
https://github.com/masungwon/techtalk-demo
Vejledning: Først startes fire separate servere på henholdsvis port 8001, 8002, 8003 og 8004. Disse startes i hver sin terminal med kommandoen 'node server.js 8001', 'node server.js 8002', osv., jf. brugen af 'progress.argv.splice(2)[0]'.

Dernæst startes load balanceren i endnu en terminal med kommandoen 'node loadBalancer.js 8000'. Denne køres på port 8000, som derfra vil videresende requests på porten til skiftevis 8001, 8002, 8003 og 8004.

Nu er det muligt at tilgå applikationen enten i terminalen ved kommandoen 'curl http://localhost:8000' eller ved 'http://localhost:8000' i en vilkårlig browser. Her mødes brugeren med en besked om, hvilken port applikationen er videresendt til, ligesom det også logges i terminalen for de respektive servere.