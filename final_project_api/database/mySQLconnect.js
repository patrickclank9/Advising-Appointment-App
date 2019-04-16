let mysql = require('mysql');

let connection = mysql.createConnection({
    debug: true,

	host: 'localhost',
	port: 3306,
	user: 'cs386_phernand',
	password:'he5223',
	database: 'cs386_phernand'
});

module.exports = connection;
