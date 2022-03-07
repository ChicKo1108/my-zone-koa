const UserController = require('../controllers/user.controller');

const prefix = '/user';
const routes = [
  {
    method: 'get',
    route: '/baseInfo',
    handler: UserController.getInstance().getBaseInfo,
  }
];


module.exports = {
  prefix,
  routes,
}