const express = require('express');

// Création d'un routeur que l'on exportera au serveur
const router = express.Router();
// import du controleur métier
const auth = require('../middleware/auth');
const controller = require('../controllers/thingController');

router.post('/', auth, controller.createThing);
router.get('/:id', auth, controller.getOneThing);
router.put('/:id', auth, controller.updateOneThing);
router.delete('/:id', auth, controller.deleteThing);
router.get('/', auth, controller.getAllThings);

module.exports= router;