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
    ctx.success({
      list: await ArticleService.getInstance().getAll()
    })
  }

  async findArticleById(ctx) {
    try {
      const { id } = ctx.query;
      if (!id) {
        throw new Error('`id` is not defined!');
      }
      ctx.success(await ArticleService.getInstance().findArticleById(id));
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  async updateArticle(ctx) {
    try {
      console.log(ctx.request.body);
      const { id, title, content, intro } = ctx.request.body;
      if (!(title || content || intro)) {
        throw new Error('param lost!');
      }
      if (!id && !(title && content && intro)) {
        throw new Error('param lost!');
      }
      ctx.success(await ArticleService.getInstance().postArticle(id, { title, content, intro }));
    } catch (error) {
      ctx.fail(error.message);
    }
  }
}


module.exports = ArticleController;