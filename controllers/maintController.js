const { dbMaint } = require('../config/dbMaint');
const sql = require('mssql');

const getDownTime = async (req, res) => {
  const { pid, did, cid } = req.params;
  try {
    const pool = await dbMaint;
    const downTime = await pool.query(`PRC_GET_DOWNTIME ${pid},${did},${cid}`);
    return res.status(200).json(downTime);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const createReason = async (req, res) => {
  const { deprt, category, reason } = req.body;
  try {
    const pool = await dbMaint;
    const result = await pool
      .request()
      .input('pIN_deprt', sql.VarChar(50), deprt)
      .input('pIN_category', sql.VarChar(50), category)
      .input('pIN_reason', sql.NVarChar(250), reason)
      .execute('PRC_INSERT_REASON');
    return res.status(200).json({ status: 'Success', data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getreason = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await dbMaint;
    const reason = await pool.query(`PRC_GET_REASONID ${id}`);
    res.status(200).json(reason);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const reasonUpadte = async (req, res) => {
  const { id, name, reason, textarea } = req.body;

  try {
    const pool = await dbMaint;
    const result = await pool
      .request()
      .input('pIN_ID', sql.Int, id)
      .input('pIN_REASONID', sql.VarChar(50), reason)
      .input('pIN_Action', sql.NVarChar(250), textarea)
      .input('pIN_name', sql.NVarChar(50), name)
      .execute('PRC_UPDATE_DOWN REASON');
    return res.status(200).json({ status: 'Success', data: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  getDownTime,
  createReason,
  getreason,
  reasonUpadte,
};
