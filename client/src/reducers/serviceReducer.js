import {
  FETCH_SERVICES, SERVICE_CREATED, SERVICE_CLICKED, SERVICE_DELETED
} from '../actions/types';

const INITIAL_STATE = {
  services: null,
  serviceSelected: null,
  pages: null,
  page: 1
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICES:
      return { ...state, services: action.payload.docs, pages: action.payload.pages, page: action.payload.page  };
    case SERVICE_CLICKED:
      return { ...state, serviceSelected: action.payload };
    case SERVICE_CREATED:
      return { ...state };
    case SERVICE_DELETED:
      return { ...state, serviceSelected: null };
    default:
      return state;
  }
}
