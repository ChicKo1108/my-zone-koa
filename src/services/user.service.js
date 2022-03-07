const { query } = require('../utils/mysql');

class UserService {
  constructor() {
    this.name = 'User';
    this.instance = null;
    console.log(`[service] ${this.name} has been inited!`);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  getBaseInfo() {
    const sql = `
      select username, birth, avatar, province, jobExp, email, wx, college, major, schoolYear, level, skills, jobs
      from user
      where id = 1
    `;
    return query(sql);
  }

}

module.exports = UserService;