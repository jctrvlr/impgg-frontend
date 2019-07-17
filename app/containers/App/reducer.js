/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  currentUser: false,
  userData: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTHENTICATE_USER:
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;

      case AUTHENTICATE_USER_SUCCESS:
        draft.userData = action.userData;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case AUTHENTICATE_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case REGISTER_USER:
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;

      case REGISTER_USER_SUCCESS:
        draft.userData = action.userData;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case REGISTER_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOGOUT_USER:
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;
    }
  });

export default appReducer;
