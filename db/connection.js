const config = require('config');
const mysql      = require('mysql');
var connection = mysql.createConnection(config.get("db_config"));

connection.connect();

module.exports = connection;