const UserService = require('../services/user.service');

class UserController {
  constructor() {
    this.name = 'User';
    this.instance = null;
    console.log(`[controller] ${this.name} has been inited!`);
  }
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new UserController();
    }
    return this.instance;
  }
  
  async getBaseInfo(ctx) {
    ctx.body = await UserService.getInstance().getBaseInfo();
  }
}


module.exports = UserController;