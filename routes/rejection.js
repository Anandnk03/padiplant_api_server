const express = require('express');
const router = express.Router();

const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}Controller`);

router.put('/master/reason', Controller.createReasonMaster);
router.get('/categroy', Controller.getNcReasonCategroy);
router.get('/:date/:shift/:module', Controller.getNcQty);
router.post('/addnc', Controller.updateNc);
router.get('/:id/:mid', Controller.getReasons);
router.put('/reasonupdate', Controller.updateReasons);
router.put('/master/reason', Controller.createReasonMaster);

module.exports = router;
