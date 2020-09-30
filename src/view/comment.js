import moment from 'moment';
import AbstractView from "./abstract.js";

const createCommentTemplate = ({id, date, author, comment}) => {
  return (
    `<li class="comments__item comment" id=${id}>
      <p class="comment__top">
        <span class="comment__date">${moment(date).format(`DD.MM.YYYY`)}</span>
        <span class="comment__name">${author}</span>
      </p>
      <p class="comment__text">${comment}</p>
    </li>`
  );
};

export default class Comment extends AbstractView {
  constructor(comment) {
    super();
    this._data = {};
    this._comment = comment;
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }
}