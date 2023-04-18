const db = require('./dbConfig');

const connectDB = async () => {
  try {
    db.sequelize
      .authenticate()
      .then(() => {
        console.log('Connected to MSSQL database:', process.env.DB_NAME);
      })
      .catch((err) => {
        console.error(
          'Unable to connect to MSSQL database:',
          process.env.DB_NAME,
          process.env.DB_HOST,
          err
        );
      });
    if (process.env.APP === 'dev') {
      db.sequelize.sync(); //creates table if they do not already exist
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
