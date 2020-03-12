/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import moment from 'moment';
import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  RESET_ERROR,
  EDIT_EMAIL_SUCCESS,
  NEW_USER_DATA,
} from './constants';
let userDataR = {};
let loggedInR = false;

// The initial state of the App
if (localStorage.getItem('userData')) {
  userDataR = JSON.parse(localStorage.getItem('userData'));
  loggedInR = !!localStorage.getItem('userData');
  const today = moment.utc();
  const expiresIn = moment.utc(userDataR.expires);
  if (expiresIn.isBefore(today)) {
    loggedInR = false;
    userDataR = {};
  }
}

export const initialState = {
  loggedIn: loggedInR,
  loading: false,
  currentUser: false,
  userData: userDataR,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTHENTICATE_USER:
        draft.loggedIn = false;
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;

      case AUTHENTICATE_USER_SUCCESS:
        draft.loggedIn = true;
        draft.userData = action.userData;
        draft.loading = false;
        draft.currentUser = action.username;
        draft.error = false;
        break;

      case AUTHENTICATE_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case REGISTER_USER:
        draft.loggedIn = false;
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;

      case REGISTER_USER_SUCCESS:
        draft.loggedIn = true;
        draft.userData = action.userData;
        draft.loading = false;
        draft.error = false;
        draft.currentUser = action.username;
        break;

      case REGISTER_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case RESET_ERROR:
        draft.error = false;
        break;

      case LOGOUT_USER:
        draft.loading = false;
        draft.error = false;
        draft.userData = false;
        draft.loggedIn = false;
        break;

      case EDIT_EMAIL_SUCCESS:
        draft.userData = action.userData;
        draft.currentUser = action.username;
        break;

      case NEW_USER_DATA:
        draft.userData = action.userData;
        break;
    }
  });

export default appReducer;
