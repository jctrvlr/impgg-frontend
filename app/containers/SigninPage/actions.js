/*
 *
 * SigninPage actions
 *
 */

import { CHANGE_EMAIL, CHANGE_PASSWORD, EMAIL_VALIDATION } from './constants';

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

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}
