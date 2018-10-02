import {
  FETCH_DOCS, DOC_CREATED, DOC_CLICKED, DOC_DELETED, DOC_SELECTED_CLEAN
} from '../actions/types';

const INITIAL_STATE = {
  docs: null,
  docType: null,
  docSelected: null,
  pages: null,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_DOCS:
      return { ...state, docs: action.payload.docs, pages: action.payload.pages, page: action.payload.page  };
    case DOC_CLICKED:
      return { ...state, docSelected: action.payload };
    case DOC_SELECTED_CLEAN:
      return { ...state, docSelected: action.payload };
    case DOC_DELETED:
      return { ...state, docType: action.payload };
    case DOC_CREATED:
      return { ...state };
    default:
      return state;
  }
}
