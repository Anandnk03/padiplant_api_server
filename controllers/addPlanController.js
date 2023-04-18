const sequelize = require('../config/dbConfig').sequelize;
//var moment = require('moment');
const sql = require('mssql');
const { poolPromise } = require('../config/rawdb');

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sequelize.query(
      `PRC_GET_FINALASSEMBLY_MACHINE_BY_MACHINEID_js '${id}'`
    );
    return res.status(200).json(product);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
  }
};

const vaildtime = async (req, res) => {
  const { id } = req.params;
  try {
    const time = await sequelize.query(
      `PRC_GET_HOURSTARTTIME_PALNENTY_js ${id}`
    );
    let hour = [];

    await time[0].forEach((element) => {
      hour.push({
        HOURDESCRIPITION: element.HOURDESCRIPITION,
        STARTTIME: element.STARTTIME.split('.')[0],
      });
    });
    return res.status(200).json(hour);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
    console.log(err);
  }
};

const getMachines = async (req, res) => {
  const { id } = req.params;
  try {
    const machines = await sequelize.query(`PRC_PLAN_MACHINE_DEPT_js '${id}'`);
    return res.status(200).json(machines);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
  }
};

const addPlan = async (req, res) => {
  const {
    STARTDATE,
    ENDDATE,
    SHIFTNUMBER,
    MACHINEID,
    PASSCODE,
    MACHINEOPERATIONID,
    MANPOWER,
    STATUS,
    STARTTIME,
  } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pIN_STARTDATE', sql.Date, STARTDATE)
      .input('pIN_ENDDATE', sql.Date, ENDDATE)
      .input('pIN_SHIFTNUMBER', sql.Int, SHIFTNUMBER)
      .input('pIN_MACHINEID', sql.Int, MACHINEID)
      .input('pIN_PASSCODE', sql.Int, PASSCODE)
      .input('pIN_MACHINEOPERATIONID', sql.Int, MACHINEOPERATIONID)
      .input('pIN_MANPOWER', sql.VarChar(255), MANPOWER)
      .input('pOUT_STATUS', sql.Int, STATUS)
      .input('pIN_STARTTIME', sql.NVarChar(255), STARTTIME)
      .execute(`PRC_INSERT_PLAN_DETAILS_WITHOUTPLAN_js`);
    return res.status(200).json({ status: 'Success', data: result });
  } catch (err) {
    /// return res.status(200).json(result);
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const updatePlan = async (req, res) => {
  const {
    STARTDATE,
    ENDDATE,
    SHIFTNUMBER,
    MACHINEID,
    PASSCODE,
    MACHINEOPERATIONID,
    MANPOWER,
    STATUS,
    STARTTIME,
  } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pIN_STARTDATE', sql.Date, STARTDATE)
      .input('pIN_ENDDATE', sql.Date, ENDDATE)
      .input('pIN_SHIFTNUMBER', sql.Int, SHIFTNUMBER)
      .input('pIN_MACHINEID', sql.Int, MACHINEID)
      .input('pIN_PASSCODE', sql.Int, PASSCODE)
      .input('pIN_MACHINEOPERATIONID', sql.Int, MACHINEOPERATIONID)
      .input('pIN_MANPOWER', sql.VarChar(255), MANPOWER)
      .input('pOUT_STATUS', sql.Int, STATUS)
      .input('pIN_STARTTIME', sql.NVarChar(255), STARTTIME)
      .execute(`PRC_INSERT_PLAN_DETAILS_WITHOUTPLAN_js`);
    return res.status(200).json({ status: 'Update Success', data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  getProduct,
  addPlan,
  updatePlan,
  vaildtime,
  getMachines,
};
