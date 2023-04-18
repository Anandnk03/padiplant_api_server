const express = require('express');
const router = express.Router();

const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}Controller`);

router.get('/', Controller.getDept);
router.get('/modules', Controller.getModules);
router.get('/:id', Controller.getMouduls);
router.get('/view/:did/:mid', Controller.getPlan);
router.put('/delete', Controller.deleteplan);
router.put('/setprogram', Controller.setProgream);
router.get('/hourly/:id/:sdate?/:shift?', Controller.getHourlyDashboard);

module.exports = router;
