import {
  FETCH_POSTS, POST_CREATED, POST_CLICKED, POST_DELETED, CATEGORY_CLICKED, POST_OTHERS
} from '../actions/types';

const INITIAL_STATE = {
  posts: null,
  postSelected: null,
  pages: null,
  page: 1,
  categoryClicked: '',
  postsOthers: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, posts: action.payload.docs, pages: action.payload.pages, page: action.payload.page  };
    case POST_CLICKED:
      return { ...state, postSelected: action.payload };
    case POST_CREATED:
      return { ...state };
    case POST_OTHERS:
      return { ...state, postsOthers: action.payload };
    case POST_DELETED:
      return { ...state, postSelected: null };
    case CATEGORY_CLICKED:
      return { ...state, categoryClicked: action.payload };
    default:
      return state;
  }
}
