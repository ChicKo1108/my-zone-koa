class Comment {
  constructor(props) {
    this.id = props.id;
    this.articleId = props.articleId;
    this.username = props.username;
    this.content = props.content;
    this.replyId = props.replyId;
    this.createdAt = props.createdAt;
  }
}

module.exports = Comment;