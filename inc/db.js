const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  database: 'saboroso',
  password: '',
  multipleStatements: true
});

module.exports = connection;