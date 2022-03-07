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
      select username, birth, avatar, province, jobExp, email, wx, college, major, schoolYear, level, skills, jobs, nation, view
      from user
      where id = 1
    `;
    return query(sql);
  }

  async addView() {
    const sql = `select view from user where id = 1`;
    const res = await query(sql);
    const res2 = await query(`update user set view = ${res[0].view + 1} where id = 1`);
    return !!res2.affectedRows;
  }

}

module.exports = UserService;