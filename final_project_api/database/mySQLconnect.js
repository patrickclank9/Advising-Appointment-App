let mysql = require('mysql');

let connection = mysql.createConnection({
    debug: true,

	host: 'localhost',
	port: 3306,
	user: 'sql user name',
	password:'sql password',
	database: 'sql user name'
});

module.exports = connection;
