const { Pool } = require('pg');
// const { user, host, database, password, port } = require('../secrets/db_configuration')

const pool = new Pool(
  { 
    user: 'iiiygtjwjhqgga',
    host: 'ec2-54-235-210-115.compute-1.amazonaws.com',
    database: 'd9opagtrk4m2nf',
    password: '61636171199b32d5fd1b4a4c9deb35f3fd6defc8f5c2fc6cff8cfcab00b55873',
    port: 5432
  }
);

module.exports = pool;