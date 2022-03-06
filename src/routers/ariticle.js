const ArticleController = require('../controllers/article.controller');

const prefix = '/article';
const routes = [
  {
    method: 'get',
    route: '/all',
    handler: ArticleController.getAll,
  }
];


module.exports = {
  prefix,
  routes,
}