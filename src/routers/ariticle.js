const ArticleController = require('../controllers/article.controller');

const prefix = '/article';
const routes = [
  {
    method: 'get',
    route: '',
    handler: ArticleController.getInstance().findArticleById,
  },
  {
    method: 'get',
    route: '/all',
    handler: ArticleController.getInstance().getAll,
  },
  {
    method: 'post',
    route: '',
    handler: ArticleController.getInstance().updateArticle,
  }
];


module.exports = {
  prefix,
  routes,
}