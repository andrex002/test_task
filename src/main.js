import {generateComments} from "./mock/comment.js";
import CommentsModel from "./model/comments.js";
import CommentListPresenter from "./presenter/comment-list.js";

const NUMBER_COMMENT = 23;

const comments = generateComments(NUMBER_COMMENT);

const commentsModel = new CommentsModel();
commentsModel.set(comments);

const mainWrapperElement = document.querySelector('.main__wrapper');

const commentListPresenter = new CommentListPresenter(mainWrapperElement, commentsModel);

commentListPresenter.init();