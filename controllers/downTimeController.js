const sequelize = require('../config/dbConfig').sequelize;
const sql = require('mssql');
const { poolPromise } = require('../config/rawdb');

const getMouduls = async (req, res) => {
  try {
    const result = await sequelize.query(`GET_PRC_MODUELS `);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getMachines = async (req, res) => {
  const { id } = req.params;
  try {
    const machine = await sequelize.query(`PRC_GETMACHINE_BYMODULES'${id}'`);
    return res.status(200).json(machine);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
  }
};

const getDownTime = async (req, res) => {
  const { id } = req.params;
  try {
    const downtime = await sequelize.query(`PRC_GET_DOWNTIME ${id}`);
    res.status(200).json(downtime);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
    console.error(err);
  }
};

const getReason = async (req, res) => {
  try {
    const reason = await sequelize.query(`PRC_GET_NPT_REASON`);
    return res.status(200).json(reason);
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const updateReason = async (req, res) => {
  const { id, reasonID } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pIN_reasonId', sql.Int, reasonID)
      .input('pIN_ID', sql.Int, id)
      .execute(`PRC_Update_NptREASON`);
    return res.status(200).json({ status: 'Success', data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const createReason = async (req, res) => {
  const { reason, rootCause, usedoee } = req.body;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('pIN_Reason', sql.VarChar(255), reason)
      .input('pIN_RootCause', sql.VarChar(255), rootCause)
      .input('pIN_UsedOee', sql.VarChar(25), usedoee)
      .execute(`PRC_INSERT_NEWREASONMASTER`);
    return res.status(200).json({ status: 'Success', data: result });
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER error');
  }
};

module.exports = {
  getMachines,
  getMouduls,
  getDownTime,
  updateReason,
  getReason,
  createReason,
};
