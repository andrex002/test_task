export default class Observer {
	constructor() {
		this._observers = [];
	}

	addObserver(observer) {
		this._observers.push(observer);
	}

	removeObserver(observer) {
		this._observers = this._observers.filter((currentObserver) => currentObserver !== observer);
	}

	_notify(update) {
		this._observers.forEach((observer) => observer(update));
	}
}