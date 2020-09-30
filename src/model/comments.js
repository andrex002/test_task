import Observer from "../utils/observer.js";

export default class Comments extends Observer {
	constructor() {
		super();
		this._comments = [];
	}

	set(comments) {
		this._comments = comments.slice();
	}

	get() {
		return this._comments;
	}

	add(update) {
		this._comments = [update, ...this._comments];
		this._notify(update);
	}
}