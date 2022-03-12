const express = require('express');
// database
const mongoose = require('mongoose');
const app = express();
const Thing = require('./models/thing');

// mongoDB init
mongoose.connect('mongodb+srv://Bornord:Bornord56@cluster0.9i3ay.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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
   /* 
    Vue la construction du frontEnd
    Il faut retirer l'attribut ID, qui sera attribué automatiquement par MongoDB. 
    */
    delete req.body._id;
    const thing = new Thing({
     
        /* 
        1ère façon de faire
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL,
        userId: req.body.userId,
        price: req.body.price,
        */

        /* 
        2ème façon de faire
        copie les champs et détails les attributs.
        */
        ... req.body
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({error}));
});

app.get('/api/stuff/:id', (req,res,next) => {
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
});

app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: "objet supprimé. "}))
        .catch(error => res.status(400).json({error}));
});

// Interception des requêtes GET
// app.use() : n'est plus nécessaire
app.use('/api/stuff', (req,res,next) => {
    /* ancienne façon de faire, de façon statique...
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
    */

    /* Nouvelle approche dynamique */
    Thing.find()
        .then(things =>
                res.status(200).json(things)
            )
        .catch(error =>
            res.status(400).json(error));
});


module.exports = app;

