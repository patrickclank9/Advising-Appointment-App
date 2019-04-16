const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

let count = 0;

class AdviseeController {
	constructor() {
		console.log('Constructor of AdviseeController is called.');
	}

	async allAdvisees(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                SELECT *
                FROM cs386_students
                ORDER BY student_lName ASC, student_fName ASC, student_mName ASC
                LIMIT 100;
            `;
			dbConnection.query({
				sql: query,
				values: []
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdviseeController::allAdvisees", error);
					ctx.body = [];
					ctx.status = 200;
					return reject(error);
				}
				ctx.body = tuples;
				ctx.status = 200;
				return resolve();
			});
		}).catch(err => console.log("Database connection error.", err));
	}

}

module.exports = AdviseeController
