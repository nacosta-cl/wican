const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const mailer = require('./mailers');
const routes = require('./routes/api');
const orm = require('./models');

// App constructor
const app = new Koa();

// expose ORM through context's prototype
app.context.orm = orm;

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
app.use(koaLogger());

// parse request body
app.use(koaBody({
  multipart: true,
  keepExtensions: true,
}));

mailer(app);

// Routing middleware
app.use(routes.routes());

module.exports = app;
