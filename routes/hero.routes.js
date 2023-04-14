const express = require('express');
const heroController = require('../controller/hero.controller');

const router = express.Router();

//hero controller
router.route('/').get(heroController.getAllHero);
router.route('/:id').get(heroController.getHeroDetails);
router.route('/').post(heroController.createHero);
router.route('/:id').patch(heroController.editHero);
router.route('/:id').delete(heroController.deleteHero);

module.exports = router;
