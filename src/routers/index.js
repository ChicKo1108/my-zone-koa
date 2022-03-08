const ArticleConfig = require('./ariticle');
const UserConfig = require('./user');

const ROUTER_LIST = [
  ArticleConfig,
  UserConfig,
]

function initRouters(router) {
  ROUTER_LIST.forEach(({ prefix, routes }) => {
    routes.forEach(({ method, route, handler }) => {
      registerRoute(router, prefix, route, method, handler);
    });
  });
  // login
  console.log(`[router] - post '/login' has been registed.`);
  router.post('/login', async (ctx) => {
    ctx.status = 200;
    ctx.body = 'login success';
  });
}

module.exports = {
  initRouters,
};

// 注册路由
function registerRoute(router, prefix, route, method, handler) {
  router[method](prefix + route, handler);
  console.log(`[router] - ${method} '${prefix}${route}' has been registed.`);
}