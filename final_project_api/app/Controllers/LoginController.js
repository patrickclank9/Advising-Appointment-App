const dbConnection = require('../../database/mySQLconnect');

class LoginController {
    async authorizeUser(ctx) {
        return new Promise((resolve, reject) => {
            const match = ctx.params.user_id.match(/[^0-9]+/);  // We expect an all digit user-id.
            if (match) {
                console.log('about to return because user input contains non-digit characters..');
                return reject("Incorrect login credentials.");
            }
            let query = "SELECT * FROM users WHERE user_id = ?";
	        console.log('ctx.params.user_id is', ctx.params.user_id);
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.user_id]
                }, (error, tuples) => {
                    if (error) {
                        return reject(error);
                    }
                    if (tuples.length === 1) {
                        console.log('from LoginController. About to return ', tuples[0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples[0],
                        };
                        return resolve();
                    }
                    return reject("No such user.");
                }
            )
        }).catch(err => {
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });
    }

    async userTypes(ctx) {
        return new Promise((resolve, reject) => {
            let query = `
                SELECT user_id, advisor
                FROM users;
            `;
            dbConnection.query({
                sql: query,
                values: []
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in LoginController::userType", error);
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

module.exports = LoginController;
