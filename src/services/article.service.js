const { query, update, create } = require('../utils/mysql');
const Article = require('../entities/article.entity');

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
    let sql = 'SELECT title, intro, content, view, like FROM article';
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
    return query(`select * from article where id = ${id}`);
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

}

module.exports = ArticleService;