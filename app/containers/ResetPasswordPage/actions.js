/*
 *
 * ResetPasswordPage actions
 *
 */

import {
  CHANGE_EMAIL,
  EMAIL_VALIDATION,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_TOK,
  CHANGE_PASSWORD,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_ERROR,
} from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changeTok(tok) {
  return {
    type: CHANGE_TOK,
    tok,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

export function validateEmail(email) {
  /* eslint-disable no-useless-escape */
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let emailValidation = '';

  if (emailRegex.test(email)) {
    emailValidation = false;
  } else {
    emailValidation = 'Enter a valid email';
  }
  return {
    type: EMAIL_VALIDATION,
    emailValidation,
  };
}

export function resetPassword() {
  return {
    type: RESET_PASSWORD,
  };
}

export function resetPasswordSuccess(msg) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    msg,
  };
}

export function resetPasswordError(err) {
  return {
    type: RESET_PASSWORD_ERROR,
    err,
  };
}

export function setNewPassword() {
  return {
    type: SET_NEW_PASSWORD,
  };
}

export function setNewPasswordSuccess(msg) {
  return {
    type: SET_NEW_PASSWORD_SUCCESS,
    msg,
  };
}

export function setNewPasswordError(err) {
  return {
    type: SET_NEW_PASSWORD_ERROR,
    err,
  };
}
