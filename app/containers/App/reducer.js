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
import _ from 'lodash';
import Cookies from 'js-cookie';

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
  OAUTH_LOGIN,
  OAUTH_LOGIN_SUCCESS,
  OAUTH_LOGIN_ERROR,
  EMAIL_VALIDATION,
  SUBSCRIPTION_EVENT_SUCCESS,
} from './constants';
let userDataR = {};
let loggedInR = false;

// The initial state of the App
if (Cookies.get('userData')) {
  userDataR = JSON.parse(Cookies.get('userData'));
  loggedInR = !!Cookies.get('userData');
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

      case OAUTH_LOGIN:
        draft.loggedIn = false;
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;

      case OAUTH_LOGIN_SUCCESS:
        draft.loggedIn = true;
        draft.userData = action.userData;
        draft.loading = false;
        draft.currentUser = action.username;
        draft.error = false;
        break;

      case OAUTH_LOGIN_ERROR:
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

      case SUBSCRIPTION_EVENT_SUCCESS:
        draft.userData = action.userData;
        draft.currentUser = action.username;
        break;

      case NEW_USER_DATA:
        _.set(draft.userData.user, 'domains', action.userData.user.domains);
        // draft.userData = action.userData;
        break;

      case EMAIL_VALIDATION:
        draft.emailValidation = action.emailValidation;
        break;
    }
  });

export default appReducer;
