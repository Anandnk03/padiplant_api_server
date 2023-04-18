const sequelize = require('../config/dbConfig').sequelize;
const { poolPromise } = require('../config/rawdb');
const sql = require('mssql');

const getDept = async (req, res) => {
  try {
    const result = await sequelize.query(`PRC_PLAN_DEPT_js`);
    return res.status(200).json(result);
    //console.log(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMouduls = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sequelize.query(`GET_PRC_DEPARTMENT_MODUELS_js ${id}`);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPlan = async (req, res) => {
  const { did, mid } = req.params;

  try {
    const result = await sequelize.query(
      `PRC_GET_PLANDETAILS_js ${did},${mid}`
    );
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteplan = async (req, res) => {
  const { ID } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pIN_DAILYSHIFTPLANID', sql.Int, ID)
      .execute('PRC_UPDATE_DAILYSHIFTPLAN_STATUS');
    return res.status(200).json({ status: 'Success', data: result });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const setProgream = async (req, res) => {
  const { ID } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pIN_DAILYSHIFTPLANID', sql.Int, ID)
      .execute('PRC_PLAN_PROGRAMID_js');
    return res.status(200).json({ status: 'Success', data: result });
  } catch (err) {
    res.status(500);
    console.log(err);
    res.send(err.message);
  }
};

const getModules = async (req, res) => {
  try {
    const modules = await sequelize.query(`PRC_GETMODULES_DEPARTMENTNAME`);
    return res.status(200).json(modules);
  } catch (err) {
    res.status(500).send('Server error');
    console.log(err);
  }
};

const getHourlyDashboard = async (req, res) => {
  const { id, sdate, shift } = req.params;
  try {
    const hourlyData = await sequelize.query(
      sdate === undefined && shift === undefined
        ? `PRC_GET_DeptWise_Hourly_Live '${id}' `
        : `PRC_GET_DeptWise_Hourly_Live '${id}','${sdate}',${shift}`
    );
    return res.status(200).json(hourlyData);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getDept,
  getMouduls,
  getPlan,
  deleteplan,
  setProgream,
  getModules,
  getHourlyDashboard,
};
