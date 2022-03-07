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
    ctx.success({
      data: await UserService.getInstance().getBaseInfo(),
    })
  }

  async addView(ctx) {
    try {
      const data = await UserService.getInstance().addView();
      ctx.success(data);
    } catch (error) {
      ctx.fail(error.message);
    }
  }
}


module.exports = UserController;  