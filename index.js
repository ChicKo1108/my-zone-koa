const Koa = require('koa')
const router = new require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
const KoaSession = require('koa-session');
const { initRouters } = require('./src/routers');
const { responseHandler } = require('./src/utils/middelware');
const { query } = require('./src/utils/mysql');

// 返回值格式化
app.use(responseHandler());

// session
const sesseion_signed_key = ["10 million zone secret key."];
const session_config = {
  key: 'koa:sess', /**  cookie的key。 (默认是 koa:sess) */
  maxAge: 1000 * 60 * 12,   /**  session 过期时间，以毫秒ms为单位计算 。*/
  autoCommit: true, /** 自动提交到响应头。(默认是 true) */
  overwrite: true, /** 是否允许重写 。(默认是 true) */
  httpOnly: true, /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
  signed: true, /** 是否签名。(默认是 true) */
  rolling: true, /** 是否每次响应时刷新Session的有效期。(默认是 false) */
  renew: false, /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
const session = KoaSession(session_config, app);
app.keys = sesseion_signed_key;
app.use(session);

app.use(cors())
app.use(bodyParser())

app.use(async(ctx, next) => {
  // 需要鉴权的路由
  const needCheckRoutes = [
    '/login',
    '/article',
  ];
  if (needCheckRoutes.includes(ctx.path) && !ctx.session.logged) {  // 如果登录属性为undefined或者false，对应未登录和登录失败
    ctx.session.logged = false;
    const { username, password } = ctx.request.body;
    // 判断用户名密码是否为空
    if (username && password) {
      const account = await query(`select * from user where username = '${username}'`);
      if (account && account.length && account[0].username === username) {
        if (account[0].password == password) {
          ctx.session.logged = true;
          await next();
        } else {
          ctx.status = 500;
          ctx.body = '用户名或密码错误';
        }
      } else {
        ctx.status = 500;
        ctx.body = '未找到用户';
      }
    } else {
      ctx.status = 500;
      ctx.body = 'session error';
    }
  } else {
    await next();
  }
});

// 注册路由
initRouters(router);
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())


// 开启监听 端口自定义
app.listen(3000, () => {
  console.log('server is starting at port 3000')
})