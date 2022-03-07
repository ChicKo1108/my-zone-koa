const { query } = require('../utils/mysql');

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
    let sql = 'SELECT * FROM article';
    return query(sql);
  }

}

module.exports = ArticleService;