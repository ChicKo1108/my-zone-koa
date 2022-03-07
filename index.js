const Koa = require('koa')
const router = new require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const app = new Koa()
const { initRouters } = require('./src/routers');
const { responseHandler } = require('./src/utils/middelware');

// 返回值格式化
app.use(responseHandler());

// 注册路由
initRouters(router);

// 加载路由中间件
app.use(cors())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())


// 开启监听 端口自定义
app.listen(3000, () => {
  console.log('server is starting at port 3000')
})