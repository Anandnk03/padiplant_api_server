const sql = require('mssql');
const config = {
  user: 'sa',
  password: 'E2Mproduct',
  server: 'localhost',
  database: 'E2M',
  options: {
    encrypt: false,
    enableArithAbort: true,
  },
};
const dbMaint = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to MSSQL database : E2M');
    return pool;
  })
  .catch((err) => console.log('Database Connection Failed! Bad Config: ', err));
module.exports = {
  sql,
  dbMaint,
};
