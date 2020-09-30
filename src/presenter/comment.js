import CommentView from '../view/comment.js';
import {render, RenderPosition, remove} from '../utils/render.js';

export default class Comment {
	constructor(commentsContainer) {
		this._commentsContainer = commentsContainer;
		this._comment = null;
	}

	init(comment) {
		this._comment = comment;
		this._commentComponent = new CommentView(this._comment);

		render(this._commentsContainer, this._commentComponent, RenderPosition.AFTERBEGIN);
	}
}