const { query } = require('../utils/mysql');

class ArticleService {
  
  static async getAll() {
    let sql = 'SELECT * FROM `10MillionZone`.article';
    return await query(sql);
  }

}

module.exports = ArticleService;