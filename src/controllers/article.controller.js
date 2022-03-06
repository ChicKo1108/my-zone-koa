const ArticleService = require('../services/article.service');

class ArticleController {
  static async getAll(ctx) {
    ctx.body = ArticleService.getAll();
  }
}


module.exports = ArticleController;