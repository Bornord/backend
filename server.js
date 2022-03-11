// require = import en python ou en java
const http = require('http');
const app = require('./app.js');

// amélioration du code
const normalizePort = val => {
    const port = parseInt(val,10);
    if (isNaN(port)){
        return val;
    } else if (port >=0) {
        return val;
    } else {
        return false;
    }
}
const port = normalizePort(process.env.PORT || 3000);
const errorHandler = error => {
    if (error.syscall !=='listen'){
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + adress: 'port:' + port;
    switch (error.code){
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;

        default: 
        throw error;
    }
};

// createServer : prend en argument une FONCTION (requête, résultat)
// app contient une fonction qui prend en charge se rôle. 
const server = http.createServer(app)
server.on('error',errorHandler);
server.on('listening',() => {
        const address = typeof address === 'string' ? 'pipe' + address: 'port' + port;
        console.log('Listening on ' + bind);
    }
);

server.listen(port);