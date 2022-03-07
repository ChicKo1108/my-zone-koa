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
    ctx.success(await ArticleService.getInstance().getAll());
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

  async addView(ctx) {
    try {
      const { id } = ctx.request.body;
      if (!id) {
        throw new Error('param lost!');
      }
      ctx.success(await ArticleService.getInstance().addView(id));
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  async like(ctx) {
    try {
      const { id } = ctx.request.body;
      if (!id) {
        throw new Error('param lost!');
      }
      ctx.success(await ArticleService.getInstance().like(id));
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  async dislike(ctx) {
    try {
      const { id } = ctx.request.body;
      if (!id) {
        throw new Error('param lost!');
      }
      ctx.success(await ArticleService.getInstance().dislike(id));
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  async addComment(ctx) {
    try {
      const { articleId, username, content, replyId } = ctx.request.body;
      if (!articleId || !username || !content) {
        throw new Error('param lost');
      }
      ctx.success(await ArticleService.getInstance().addComment({ articleId, username, content, replyId }));
    } catch (error) {
      ctx.fail(error.message);
    }
  }

  async getComments(ctx) {
    try {
      const { articleId: id } = ctx.query;
      if (!id) {
        throw new Error('param lost');
      }
      ctx.success(await ArticleService.getInstance().getComments(id));
    } catch (error) {
      ctx.fail(error.message);
    }
  }
}


module.exports = ArticleController;