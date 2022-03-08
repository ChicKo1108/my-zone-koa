const { query, update, create } = require('../utils/mysql');
const Article = require('../entities/article.entity');
const Comment = require('../entities/comment.entity');

class ArticleService {
  constructor() {
    this.name = 'Article';
    this.instance = null;
    console.log(`[service] ${this.name} has been inited!`);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ArticleService();
    }
    return this.instance;
  }

  getAll() {
    let sql = `
      select count(c.id) as comment, articleId, a.* from article a
      left join comment c on a.id = c.articleId 
      group by a.id
      order by a.id DESC
    `;
    return query(sql);
  }

  updateArticle(id, { title, content, category, intro, view, like }) {
    const article = new Article({ title, content, category, intro, view, like });
    return update('article', article, { id });
  }

  createArticle({ title, content, category, intro }) {
    const article = new Article({ title, content, category, intro });
    return create('article', article);
  }

  findArticleById(id) {
    return query(`
      select count(c.id) as commentCount, articleId, a.* from article a 
      left join comment c on a.id = c.articleId 
      where a.id = ${id}
      group by a.id 
    `);
  }

  async postArticle(id, article) {
    if (!id) {
      return this.createArticle(article);
    } else {
      const res = await this.findArticleById(id);
      if (res && res.length) {
        return this.updateArticle(id, article);
      } else {
        return this.createArticle(article);
      }
    }
  }

  async addView(id) {
    const article = await this.findArticleById(id);
    return this.updateArticle(id, { view: article[0].view + 1 })
  }

  async like(id) {
    const article = await this.findArticleById(id);
    return this.updateArticle(id, { like: article[0].like + 1 });
  }

  async dislike(id) {
    const article = await this.findArticleById(id);
    if (article[0].like === 0) {
      return false;
    }
    return this.updateArticle(id, { like: article[0].like - 1 });
  }

  async getComments(id) {
    return query(`select * from comment where articleId = ${id} order by createdAt ASC`);
  }

  async addComment({ username, content, articleId, replyId }) {
    const article = await this.findArticleById(articleId);
    if (!article || !article.length) {
      throw new Error('未找到相关文章.');
    }
    const comment = new Comment({ username, content, articleId, replyId });
    return create('comment', comment);
  }

}

module.exports = ArticleService;