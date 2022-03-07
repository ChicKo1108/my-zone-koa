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
  },
  {
    method: 'post',
    route: '/view',
    handler: ArticleController.getInstance().addView,
  },
  {
    method: 'post',
    route: '/like',
    handler: ArticleController.getInstance().like,
  },
  {
    method: 'post',
    route: '/dislike',
    handler: ArticleController.getInstance().dislike,
  },
];


module.exports = {
  prefix,
  routes,
}