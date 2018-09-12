import {
  FETCH_FISCAL, FISCAL_CREATED, FISCAL_CLICKED, FISCAL_DELETED
} from '../actions/types';

const INITIAL_STATE = {
  documents: null,
  fiscalSelected: null,
  pages: null,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FISCAL:
      return { ...state, posts: action.payload.docs, pages: action.payload.pages, page: action.payload.page  };
    case FISCAL_CLICKED:
      return { ...state, postSelected: action.payload };
    case FISCAL_CREATED:
      return { ...state };
    case FISCAL_DELETED:
      return { ...state, postSelected: null };
    default:
      return state;
  }
}
