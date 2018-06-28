import {
  FETCH_USERS, USER_CLICKED,
  USER_CHANGE_STATE
} from '../actions/types';

const INITIAL_STATE = {
  users: null,
  userSelected: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };
    case USER_CLICKED:
      return { ...state, userSelected: action.payload };
    case USER_CHANGE_STATE:
      return { ...state, userSelected: null};
    default:
      return state;
  }
}
