import CommentPresenter from "./comment.js";
import CommentsSectionView from "../view/comments-section.js";
import NewCommentView from "../view/new-comment.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const NUMBER_COMMENTS_PER_STEP = 10;

export default class CommentList {
	constructor(commentsContainer, commentsModel) {
		this._commentsContainer = commentsContainer;
    	this._commentsModel = commentsModel;
    	this._renderedCommentCount = NUMBER_COMMENTS_PER_STEP;

    	this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
    	this._renderComment = this._renderComment.bind(this);
    	this._handleModelEvent = this._handleModelEvent.bind(this);

    	this._commentsListElement = null;
    	this._showMoreButtonComponent = null;

    	this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
	}

	init() {
		this._commentsModel.addObserver(this._handleModelEvent);
		this._renderCommentsList();
		this._renderNewCommentForm();
	}

	destroy() {
		remove(this._commentsSectionComponent);
	}

	_renderNewCommentForm() {
		this._newCommentComponent = new NewCommentView();
		render(this._commentsContainer, this._newCommentComponent, RenderPosition.BEFOREEND);
		this._newCommentComponent.setSubmitCommentHandler(this._handleCommentSubmit);
	}

	_renderCommentsList() {
		this._commentsSectionComponent = new CommentsSectionView(this._commentsModel.get());
		this._comments = this._commentsModel.get();

		const commentsCount = this._comments.length;
		
		render(this._commentsContainer, this._commentsSectionComponent, RenderPosition.BEFOREEND);
		this._commentsListElement = this._commentsSectionComponent.getElement().querySelector(`.comments__list`);

		const comments = this._comments.slice(0, Math.min(commentsCount, this._renderedCommentCount));
		this._renderComments(comments);

		if (this._comments.length > this._renderedCommentCount) {
			this._renderShowMoreButton();
		}
	}

	_renderShowMoreButton() {
		this._showMoreButtonComponent = new ShowMoreButtonView();
		this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

		render(this._commentsSectionComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
	}

	_clearBoard() {
		this.destroy();
		remove(this._showMoreButtonComponent);
		remove(this._newCommentComponent);
	}

	_handleShowMoreButtonClick() {
		const commentsCount = this._commentsModel.get().length;
		const newRenderedCommentsCount = Math.min(commentsCount, this._renderedCommentCount + NUMBER_COMMENTS_PER_STEP);
		const comments = this._commentsModel.get().slice(this._renderedCommentCount, newRenderedCommentsCount);

		this._renderComments(comments);
		this._renderedCommentCount = newRenderedCommentsCount;

		if(this._renderedCommentCount >= commentsCount) {
			remove(this._showMoreButtonComponent);
		}
	}

	_handleCommentSubmit() {
		const update = this._newCommentComponent.getNewComment();
		this._commentsModel.add(update);
  }

	_handleModelEvent(update) {
		this._clearBoard();
		this._renderCommentsList();
		this._renderNewCommentForm();
	}

	_renderComment(comment) {
		this._comment = comment;
		this._commentPresenter = new CommentPresenter(this._commentsListElement);
		this._commentPresenter.init(this._comment);
	}

	_renderComments(comments) {
		comments.forEach((comment) => this._renderComment(comment));
	}
}