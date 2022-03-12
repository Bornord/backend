const express = require('express');
const app = express();

// intercepte TOUTES les requêtes qui contiennent des json et met à notre disposition le fichier
app.use(express.json());

/* 
Déclaration des permissions 
- Cela inclut l'origine des utilisateurs qui peuvent faire des requêtes.
- (jsp)
- Les méthodes autorisées.
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Interception des requêtes POST
app.post('/api/stuff',(req,res,next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé.'
    });

});

// Interception des requêtes GET
// app.use() : n'est plus nécessaire
app.get('/api/stuff', (req,res,next) => {
    const stuff = [
        {
            _id: '1',
            title: 'Mon 1er objet',
            description: 'les infos de mon 1er objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 49000,
            userId: 'ebest'
        },
        {
            _id: '2',
            title: 'Mon 2eme objet',
            description: 'les infos de mon 2eme objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2000,
            userId: 'ebest'
        } 
    ];
    res.status(200).json(stuff);
});

module.exports = app;

