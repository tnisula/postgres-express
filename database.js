const dotenv = require('dotenv');
dotenv.config();

const {Pool} = require('pg');
  const {parse} = require('pg-connection-string')
  const config = parse(process.env.SQL_SERVER)

  // Uncomment this, if you use heroku or equal to that
  // Remove also ?sslmode=disable from env.SQL_SERVER
  // config.ssl = {
    // rejectUnauthorized: false
  // }
  const pool = new Pool(config);

  module.exports = pool;
