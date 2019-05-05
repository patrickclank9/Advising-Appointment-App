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

	//get
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

	//get
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

	//get
	async getSessionsForAdvisor(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                SELECT *
                FROM advising_sessions
                WHERE advisor_id = ?
                ORDER BY date ASC, start_time ASC
                LIMIT 200;
            `;
			dbConnection.query({
				sql: query,
				values: [ctx.params.id]
			}, (error, tuples) => {
				if (error) {
					console.log("Connection error in AdvisorController::getAllSessions", error);
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

	//post
	async addOpenSession(ctx) {
		return new Promise((resolve, reject) => {
			let query = `
                INSERT INTO \`advising_sessions\` (\`advisor_id\`, \`date\`, \`start_time\`, \`duration\`, \`status\`, \`block_num\`, \`advisee_id\`) 
                VALUES (?, ?, ?, DEFAULT, DEFAULT, 0, null)
            `;
			dbConnection.query({
				sql: query,
				values: [
					ctx.request.body.advisor_id,
					ctx.request.body.date,
					ctx.request.body.start_time,
				]
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

module.exports = AdvisorController
