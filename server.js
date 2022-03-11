const http = require('http');

// createServer : prend en argument une FONCTION (requête, résultat)
const server = http.createServer( (req,res) =>{
    
    // modification du fichier =/=> changement de comportement du serveur. 
    // Il faut stopper le serveur, et le relancer ...
    res.end('Voici la réponse du serveur')
    } 
);

server.listen(process.env.PORT || 3000);