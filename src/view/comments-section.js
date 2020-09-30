import AbstractView from "./abstract.js";

export const createCommentsSectionTemplate = (comments) => {
	return (
		`<section class="comments">
			<h2 class="comments__title">Комментариев ${comments.length}</h2>
			<ul class="comments__list"></ul>
		</section>`
	);
};

export default class CommentsSection extends AbstractView {
	constructor(comments) {
		super();
		this._comments = comments;
	}

	getTemplate() {
		return createCommentsSectionTemplate(this._comments);
	}
}