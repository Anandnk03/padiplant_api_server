const sequelize = require('../config/dbConfig').sequelize;
const sql = require('mssql');
const { poolPromise } = require('../config/rawdb');

const getNcQty = async (req, res) => {
  const { date, shift, module } = req.params;
  try {
    const ncQty = await sequelize.query(
      `PRC_GET_NC_LIST'${date}','${shift}','${module}'`
    );
    return res.status(200).json(ncQty);
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const updateNc = async (req, res) => {
  const { ncqty, shiftDataId } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('pIn_AddNCQty', sql.Int, ncqty)
      .input('pIn_ShiftDataID', sql.Int, shiftDataId)
      .execute(`PRC_ADD_NC_QTY`);
    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const getReasons = async (req, res) => {
  const { mid, id } = req.params;

  try {
    const reasons = await sequelize.query(
      `PRC_Get_NCReasons_List ${id},${mid}`
    );
    res.status(200).json(reasons);
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR ');
  }
};

const updateReasons = async (req, res) => {
  const { ReasonID, createby, ncclear, shiftDataId } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('pIn_ShiftDataID', sql.Int, shiftDataId)
      .input('pIn_NCClearedQty', sql.Int, ncclear)
      .input('pIn_NCReasonID', sql.Int, ReasonID)
      .input('pIn_CreatedBy', sql.VarChar(500), createby)
      .execute(`PRC_Update_NCQty_Reason`);
    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

const getNcReasonCategroy = async (req, res) => {
  try {
    const Categroy = await sequelize.query(`PRC_GET_NCReasonCategories_List`);
    res.status(200).json(Categroy);
  } catch (err) {
    res.status(500).send('SERVER ERROR');
  }
};

const createReasonMaster = async (req, res) => {
  const { category, machineid, reason, reasonId } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input('pIn_ReasonType', sql.Int, reasonId)
      .input('pIn_MachineID', sql.Int, machineid)
      .input('pIn_ReasonCategoryID', sql.Int, category)
      .input('pIn_Reason', sql.VarChar(500), reason)
      .execute(`PRC_Insert_NCReason`);
    return res.status(200).json({ status: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(500).send('SERVER ERROR');
  }
};

module.exports = {
  getNcQty,
  updateNc,
  getReasons,
  updateReasons,
  getNcReasonCategroy,
  createReasonMaster,
};
