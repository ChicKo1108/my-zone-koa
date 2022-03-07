const ArticleController = require('../controllers/article.controller');

const prefix = '/article';
const routes = [
  {
    method: 'get',
    route: '/all',
    handler: ArticleController.getInstance().getAll,
  }
];


module.exports = {
  prefix,
  routes,
}