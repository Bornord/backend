// require = import en python ou en java
const http = require('http');
const app = require('./app.js');
// On fait agir l'app sur le port d'écoute
app.set('port',process.env.PORT || 3000);
// createServer : prend en argument une FONCTION (requête, résultat)
// app contient une fonction qui prend en charge se rôle. 
const server = http.createServer(app)

server.listen(process.env.PORT || 3000);