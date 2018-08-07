import {
  FETCH_SERVICES, SERVICE_CREATED
} from '../actions/types';

const INITIAL_STATE = {
  services: null,
  pages: null,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICES:
      return { ...state, services: action.payload.docs, pages: action.payload.pages, page: action.payload.page  };
    case SERVICE_CREATED:
      return { ...state };
    default:
      return state;
  }
}
