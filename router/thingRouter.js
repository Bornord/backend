const express = require('express');

// Création d'un routeur que l'on exportera au serveur
const router = express.Router();
// import du controleur métier
const controller = require('../controllers/thingController');

router.post('/', controller.createThing);
router.get('/:id', controller.getOneThing);
router.put('/:id', controller.updateOneThing);
router.delete('/:id', controller.deleteOneThing);
router.use('/', controller.getAllThings);

module.exports= router;