class Article {
  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.like = props.like;
    this.category = props.category;
  }
}

module.exports = Article;