/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import Cookies from 'js-cookie';

import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_ERROR,
  OAUTH_LOGIN,
  OAUTH_LOGIN_SUCCESS,
  OAUTH_LOGIN_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
  RESET_ERROR,
  EDIT_EMAIL_SUCCESS,
  NEW_USER_DATA,
} from './constants';

/**
 * Reset error
 *
 * @return {object} An action object with a type of RESET_ERROR
 */
export function resetError() {
  return {
    type: RESET_ERROR,
  };
}

/**
 * Register the user, this action starts the request saga
 *
 * @return {object} An action object with a type of REGISTER_USER
 */
export function registerUser() {
  return {
    type: REGISTER_USER,
  };
}

/**
 * Dispatched when the user is successfully changed emails
 *
 * @param  {array} userData The users data
 * @param  {string} username The current users username
 *
 * @return {object}      An action object with a type of REGISTER_USER_SUCCESS passing the newly registered users data
 */
export function editEmailSuccessApp(userData, username) {
  return {
    type: EDIT_EMAIL_SUCCESS,
    userData,
    username,
  };
}

/**
 * Dispatched when the user is successfully registered
 *
 * @param  {array} userData The users data
 * @param  {string} username The current users username
 *
 * @return {object}      An action object with a type of REGISTER_USER_SUCCESS passing the newly registered users data
 */
export function registerUserSuccess(userData, username) {
  return {
    type: REGISTER_USER_SUCCESS,
    userData,
    username,
  };
}

/**
 * Dispatched when registering the user fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of REGISTER_USER_ERROR passing the error
 */
export function registerUserError(error) {
  return {
    type: REGISTER_USER_ERROR,
    error,
  };
}

/**
 * Authenticate user with OAuth, this action starts the request saga
 *
 * @return {object} An action object with a type of AUTHENTICATE_USER
 */
export function oAuthLogin() {
  return {
    type: OAUTH_LOGIN,
  };
}

/**
 * Dispatched when the user is successfully logged in with OAuth
 *
 * @param  {array} userData The users data
 * @param  {string} username The current users username
 *
 * @return {object}      An action object with a type of OAUTH_LOGIN_SUCCESS passing the authenticated users data
 */
export function oAuthLoginSuccess(userData, username) {
  return {
    type: OAUTH_LOGIN_SUCCESS,
    userData,
    username,
  };
}

/**
 * Dispatched when authenticating the user fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of OAUTH_LOGIN_ERROR passing the error
 */
export function oAuthLoginError(error) {
  return {
    type: OAUTH_LOGIN_ERROR,
    error,
  };
}

/**
 * Authenticate user, this action starts the request saga
 *
 * @return {object} An action object with a type of AUTHENTICATE_USER
 */
export function authUser() {
  return {
    type: AUTHENTICATE_USER,
  };
}

/**
 * Dispatched when the user is successfully authenticated
 *
 * @param  {array} userData The users data
 * @param  {string} username The current users username
 *
 * @return {object}      An action object with a type of AUTHENTICATE_USER_SUCCESS passing the authenticated users data
 */
export function authUserSuccess(userData, username) {
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    userData,
    username,
  };
}

/**
 * Dispatched when authenticating the user fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of AUTHENTICATE_USER_ERROR passing the error
 */
export function authUserError(error) {
  return {
    type: AUTHENTICATE_USER_ERROR,
    error,
  };
}

/**
 * Dispatched when updated userData is received
 *
 * @param {object} user The users data
 *
 * @return {object} An action object with a type of NEW_USER_DATA passing the updated user data
 */
export function newUserData(userData) {
  return {
    type: NEW_USER_DATA,
    userData,
  };
}

/**
 * Log out user, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGOUT_USER
 */
export function logoutUser() {
  Cookies.remove('userData');
  return {
    type: LOGOUT_USER,
  };
}
