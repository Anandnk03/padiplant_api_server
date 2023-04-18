const sequelize = require('../config/dbConfig').sequelize;

const getHourly = async (req, res) => {
  const { id, sdate, shift } = req.params;
  //const status = req.params.sdate;
  //const shift = req.params.shift;
  try {
    const machines = await sequelize.query(
      sdate === undefined && shift === undefined
        ? `PRC_GET_OEE_DASHBOARDDATA '${id}' `
        : `PRC_GET_OEE_DASHBOARDDATA '${id}','${sdate}',${shift}`
    );
    return res.status(200).json(machines);
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const getHourlyData = async (req, res) => {
  const { id, sdate, shift } = req.params;
  try {
    const machines = await sequelize.query(
      sdate === undefined && shift === undefined
        ? `PRC_GET_OEE_Hourly  '${id}' `
        : `PRC_GET_OEE_Hourly  '${id}','${sdate}',${shift}`
    );
    return res.status(200).json(machines);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
  }
};

const getOee = async (req, res) => {
  const { id, sdate, shift } = req.params;
  try {
    const machines = await sequelize.query(
      sdate === undefined && shift === undefined
        ? `PRC_DB_OEELIVE '${id}' `
        : `PRC_DB_OEELIVE '${id}','${sdate}',${shift}`
    );
    return res.status(200).json(machines);
  } catch (err) {
    console.log(err);
    return res.status(500).send('SERVER ERROR');
  }
};

const getNpt = async (req, res) => {
  const { id, sdate, shift } = req.params;
  try {
    const npt = await sequelize.query(
      sdate === undefined && shift === undefined
        ? `PRC_GET_OEE_NPT '${id}' `
        : `PRC_GET_OEE_NPT '${id}','${sdate}',${shift}`
    );
    return res.status(200).json(npt);
  } catch (err) {
    console.log(err);
    return res.status(500).send('SERVER ERROR');
  }
};

module.exports = {
  getHourly,
  getOee,
  getHourlyData,
  getNpt,
};
