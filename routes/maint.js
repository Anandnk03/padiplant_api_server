const express = require('express');
const router = express.Router();

const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}Controller`);

router.get('/downtime/:pid/:did/:cid', Controller.getDownTime);
router.get('/reason/:id', Controller.getreason);
router.post('/', Controller.createReason);
router.put('/updatereason', Controller.reasonUpadte);
// router.put('/update', Controller.updatePlan);

module.exports = router;
