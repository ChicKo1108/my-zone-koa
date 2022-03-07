
const responseHandler = (options = {}) => {
  return async(ctx, next) => {
    ctx.success = (data, type) => {
      ctx.type = type || options.type || 'json';
      ctx.body = {
        code: options.scccessCode || 200,
        msg: options.msg || 'success',
        data,
      }
    }
    ctx.fail = (msg, code) => {
      ctx.type = options.type || 'json';
      ctx.body = {
        code: options.failCode || code || 500,
        msg: msg || options.msg || 'fail',
      }
    }
    await next();
  }
}

module.exports = {
  responseHandler,
}