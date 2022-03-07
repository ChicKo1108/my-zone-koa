const ArticleService = require('../services/article.service');

class ArticleController {
  constructor() {
    this.name = 'Article';
    this.instance = null;
    console.log(`[controller] ${this.name} has been inited!`);
  }
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new ArticleController();
    }
    return this.instance;
  }
  
  async getAll(ctx) {
    ctx.body = await ArticleService.getInstance().getAll();
  }
}


module.exports = ArticleController;