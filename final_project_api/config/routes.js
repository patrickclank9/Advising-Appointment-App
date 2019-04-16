const Authorize = require('../app/Authorize.js');

/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    return ctx.body = 'What is up?';
});


/*
|--------------------------------------------------------------------------
| Students router
|--------------------------------------------------------------------------
|
| Description
|
*/

const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));



const AdvisorController = new (require('../app/Controllers/AdvisorController.js'))();
const advisorRouter = require('koa-router')({
    prefix: '/advisor'
});
advisorRouter.get('/', Authorize('admin'),
    AdvisorController.allAdvisors,
    err => console.log(`allAdvisors ran into an error: ${err}`));

advisorRouter.get('/:id', Authorize('admin'),
    AdvisorController.advisorWithID,
    err => console.log(`allAdvisors ran into an error: ${err}`));



const AdviseeController = new (require('../app/Controllers/AdviseeController.js'))();
const adviseeRouter = require('koa-router')({
    prefix: '/advisee'
});
adviseeRouter.get('/', Authorize('admin'),
    AdviseeController.allAdvisees,
    err => console.log(`allAdvisees ran into an error: ${err}`));


router.use(
    '',
    loginRouter.routes(),
    advisorRouter.routes(),
    adviseeRouter.routes(),
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
