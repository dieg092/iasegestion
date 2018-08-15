import {
  FETCH_POSTS, POST_CREATED, POST_CLICKED, POST_DELETED
} from '../actions/types';

const INITIAL_STATE = {
  posts: null,
  postSelected: null,
  pages: null,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload.docs, pages: action.payload.pages, page: action.payload.page  };
    case POST_CLICKED:
      return { ...state, postSelected: action.payload };
    case POST_CREATED:
      return { ...state };
    case POST_DELETED:
      return { ...state, postSelected: null };
    default:
      return state;
  }
}
