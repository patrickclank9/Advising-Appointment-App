const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
	return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

let count = 0;

class AdvisorController {
	constructor() {
		console.log('Constructor of AdvisorController is called.');
	}

	async allAdvisors(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                SELECT *
                FROM cs386_sanitized_advisors
                ORDER BY advisor_lName ASC, advisor_fName ASC
                LIMIT 100;
            `;
			dbConnection.query({
				sql: query,
				values: []
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorController::allAdvisors", error);
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

	async advisorWithID(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                SELECT *
                FROM cs386_sanitized_advisors
                WHERE advisor_id = ?
                ORDER BY student_id
                LIMIT 100;
            `;
			dbConnection.query({
				sql: query,
				values: [ctx.params.id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorController::advisorWithID", error);
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

module.exports = AdvisorController
