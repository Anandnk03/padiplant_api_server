const express = require('express');
const router = express.Router();

const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}Controller`);

router.get('/module', Controller.getMouduls);
router.get('/machine/:id', Controller.getMachines);
router.get('/nptime/:id', Controller.getDownTime);
router.get('/reason', Controller.getReason);
router.post('/', Controller.updateReason);
router.post('/master', Controller.createReason);

module.exports = router;
