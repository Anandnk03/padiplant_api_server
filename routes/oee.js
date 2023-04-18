const express = require('express');
const router = express.Router();

const path = require('path');
const filename = path.basename(__filename);
const controllerName = filename.split('.')[0];
const Controller = require(`../controllers/${controllerName}Controller`);

router.get('/production/:id/:sdate?/:shift?', Controller.getHourly);
router.get('/live/:id/:sdate?/:shift?', Controller.getOee);
router.get('/hourly/:id/:sdate?/:shift?', Controller.getHourlyData);
router.get('/NptData/:id/:sdate?/:shift?', Controller.getNpt);

module.exports = router;
