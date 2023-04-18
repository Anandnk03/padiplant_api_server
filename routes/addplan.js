const express = require('express');
const router = express.Router();

const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}Controller`);

router.get('/product/:id', Controller.getProduct);
router.get('/:id', Controller.vaildtime);
router.get('/machine/:id', Controller.getMachines);
router.post('/', Controller.addPlan);
router.put('/update', Controller.updatePlan);

module.exports = router;
