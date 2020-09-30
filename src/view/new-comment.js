import AbstractView from "./abstract.js";
import {generateId} from '../utils/common.js';

const BLANK_COMMENT = {
  author: ``,
  comment: ``
}

const createNewCommentTemplate = () => {
  return (
    `<section class="new-comment">
      <form class="new-comment__form">
        <p><input class="new-comment__input" placeholder="Ваше имя"></p>
        <p><textarea class="new-comment__message" placeholder="Ваш отзыв"></textarea></p>
        <p><input type="submit" class="new-comment__btn" value="Сохранить"></p>
      </form>
    </section>`
  );
};

export default class NewComment extends AbstractView {
  constructor(comment = BLANK_COMMENT) {
    super();
    this._data = {};
    // this._data = NewComment.parseCommentToData(comment);
    this._data = comment;

    // this._commentSaveHandler = this._commentSaveHandler.bind(this);
    this._authorInputHandler = this._authorInputHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  getNewComment() {
    return Object.assign(
      {},
      this._data,
      {
        id: generateId(),
        date: Date.now()
      }
    );
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.new-comment__input`).addEventListener(`input`, this._authorInputHandler);
    this.getElement().querySelector(`.new-comment__message`).addEventListener(`input`, this._commentInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  setSubmitCommentHandler(callback) {
    this._callback.submitComment = callback;
    const submitBtn = this.getElement().querySelector('.new-comment__btn');
    submitBtn.addEventListener(`click`, this._commentSubmitHandler);
  }

  _authorInputHandler(evt) {
    evt.preventDefault();
    console.log(this._data)
    this.updateData({
      author: evt.target.value
    });
  }

  _commentInputHandler(evt) {
    evt.preventDefault();

    this.updateData({
      comment: evt.target.value
    });
  }

  _commentSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.submitComment();
    
  }
}