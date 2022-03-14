// import du modèle de la base MongoDB
const Thing = require('../models/thing');

// Implémentation & traitement des requêtes métiers
exports.createThing =(req,res,next) => {
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
 };
 
 exports.getOneThing =(req,res,next) => {
     Thing.findOne({_id: req.params.id})
         .then(thing => res.status(200).json(thing))
         .catch(error => res.status(404).json({error}));
 };
 
 exports.updateOneThing =  (req, res, next) => {
     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
       .catch(error => res.status(400).json({ error }));
   };
 
exports.deleteOneThing = (req, res, next) => {
     Thing.deleteOne({_id: req.params.id})
         .then(() => res.status(200).json({message: "objet supprimé. "}))
         .catch(error => res.status(400).json({error}));
 };
 
 // Interception des requêtes GET
 // router.use() : n'est plus nécessaire
 exports.getAllThings = (req,res,next) => {
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
 
     /* Nouvelle routerroche dynamique */
     Thing.find()
         .then(things =>
                 res.status(200).json(things)
             )
         .catch(error =>
             res.status(400).json(error));
 };