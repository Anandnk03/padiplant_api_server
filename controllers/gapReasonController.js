const sequelize = require('../config/dbConfig').sequelize;
const sql = require('mssql');
const { poolPromise } = require('../config/rawdb');

const getMachines = async (req, res) => {
  const { id } = req.params;
  try {
    const machines = await sequelize.query(`PRC_GETMACHINE_BYMODULES'${id}'`);
    return res.status(200).json(machines);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
  }
};

const getHourlyGap = async (req, res) => {
  const { id, date, shift } = req.params;
  try {
    const machines = await sequelize.query(
      `PRC_GET_GAPLIST'${id}','${date}',${shift}`
    );
    return res.status(200).json(machines);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
    console.log(err);
  }
};

const getGapMaster = async (req, res) => {
  const { mid, id } = req.params;
  try {
    const gapMaster = await sequelize.query(
      `PRC_GET_GAPREASONSLIST '${mid}','${id}'`
    );
    return res.status(200).json(gapMaster);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
    console.log(err);
  }
};

const createReason = async (req, res) => {
  const valus = req.body;
  try {
    for (let i = 0; i < valus.length; i++) {
      const pool = await poolPromise;
      await pool
        .request()
        .input('pIn_HourlyShiftID', sql.Int, valus[i].hourlyId)
        .input('pIn_GapReasonID', sql.Int, valus[i].gapreason)
        .input('pIn_MID', sql.Int, valus[i].mid)
        .input('pIn_LossTime', sql.VarChar(255), valus[i].lossTime)
        .input('pIn_CreatedBy', sql.VarChar(255), valus[i].createBy)
        .execute(`PRC_INSERT_HOURLYSHIFT_GAPREASON`);
    }

    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    /// return res.status(200).json(result);
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const createMaster = async (req, res) => {
  const { reason, machine, mid } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('pIN_GAPREASON', sql.VarChar(255), reason)
      .input('pIN_MACHINEID', sql.Int, machine)
      .input('pIN_4MID', sql.Int, mid)
      .execute(`PRC_INSERT_GAPREASON_MASTER`);
    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

module.exports = {
  getMachines,
  getHourlyGap,
  getGapMaster,
  createReason,
  createMaster,
};
