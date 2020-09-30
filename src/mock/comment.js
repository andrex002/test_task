import {AUTHORS, TEXT_COMMENTS} from '../const.js';
import {generateId, getRandomElement, generateTextComment, getRandomInteger} from '../utils/common.js';


const generateComment = () => {
	return {
		id: generateId(),
		author: getRandomElement(AUTHORS),
		comment: getRandomElement(TEXT_COMMENTS),
		date: getRandomInteger(new Date().setMonth(new Date().getMonth() - 6), Date.now())
	};
};

export const generateComments = (countComments) => {
	const comments = [];
	for(let i = 0; i < countComments; i++) {
		comments.push(generateComment());
	}
	return comments;
};
