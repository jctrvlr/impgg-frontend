/*
 *
 * SecurityPage actions
 *
 */

import {
  CHANGE_EMAIL,
  EMAIL_VALIDATION,
  EDIT_EMAIL,
  EDIT_EMAIL_ERROR,
  EDIT_EMAIL_SUCCESS,
} from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function editEmailSubmit() {
  return {
    type: EDIT_EMAIL,
  };
}

export function editEmailError(err) {
  return {
    type: EDIT_EMAIL_ERROR,
    err,
  };
}

export function editEmailSuccess(userData) {
  return {
    type: EDIT_EMAIL_SUCCESS,
    userData,
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
