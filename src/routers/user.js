const UserController = require('../controllers/user.controller');

const prefix = '/user';
const routes = [
  {
    method: 'get',
    route: '/baseInfo',
    handler: UserController.getInstance().getBaseInfo,
  },
  {
    method: 'post',
    route: '/view',
    handler: UserController.getInstance().addView,
  }
];


module.exports = {
  prefix,
  routes,
}