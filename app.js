const express = require('express');
const app = express();

module.exports = app;
app.use(
    (req,res,next) => {
        console.log("testons")
        next();
    }
)
app.use(
    (req,res,next) => {
        res.status(201);
        res.status(202);
        res.json({message: 'fin', heure: 13});
        console.log('on passe à la suite');
        res.status(202);
        next();
    }
)    
/*
app.use(
    (req,res,next) => {
        res.end("Testons si l'app marche");
    }
)
*/
