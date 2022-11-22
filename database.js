const dotenv = require('dotenv');
dotenv.config();

const {Pool} = require('pg');
  const {parse} = require('pg-connection-string')
  const config = parse(process.env.SQL_SERVER)

  // Uncomment this, if you use heroku or equal to that
  // Remove also ?sslmode=disable from SQL_SERVER in the env-file
  // config.ssl = {
    // rejectUnauthorized: false
  // }
  const pool = new Pool(config);

  module.exports = pool;
