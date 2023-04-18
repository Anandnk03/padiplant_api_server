const express = require('express');
const router = express.Router();

const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}Controller`);

router.get('/:id', Controller.getMachines);
router.get('/gap/:id/:date/:shift', Controller.getHourlyGap);
router.get('/master/:mid/:id', Controller.getGapMaster);
router.post('/', Controller.createReason);
router.post('/master', Controller.createMaster);
// // router.put('/update', Controller.updatePlan);

module.exports = router;
