/*
 *
 * ChangePasswordModal actions
 *
 */

import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_PASSWORD,
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  RESET_STATE,
} from './constants';

export function changeLoginEmail(loginEmail) {
  return {
    type: CHANGE_LOGIN_EMAIL,
    loginEmail,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function updatePassword() {
  return {
    type: UPDATE_PASSWORD,
  };
}

export function updatePasswordSuccess() {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
  };
}

export function updatePasswordError() {
  return {
    type: UPDATE_PASSWORD_ERROR,
  };
}

export function authUser() {
  return {
    type: AUTH_USER,
  };
}

export function authUserSuccess() {
  return {
    type: AUTH_USER_SUCCESS,
  };
}

export function authUserError(err) {
  return {
    type: AUTH_USER_ERROR,
    err,
  };
}

export function resetState() {
  return {
    type: RESET_STATE,
  };
}
