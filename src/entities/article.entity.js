class Article {
  constructor(props) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.intro = props.intro;
    this.like = props.like;
    this.category = props.category;
    this.view = props.view;
  }
}

module.exports = Article;