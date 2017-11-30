const { Pool } = require('pg');
// const { user, host, database, password, port } = require('../secrets/db_configuration')

const pool = new Pool(
  { 
    user: 'node_user',
    host: 'localhost',
    database: 'notesdb',
    password: 'password',
    port: 5432
  }
);

module.exports = pool;