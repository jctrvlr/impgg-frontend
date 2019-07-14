/*
 *
 * SigninPage actions
 *
 */

import { CHANGE_EMAIL, CHANGE_PASSWORD } from './constants';

export function changeEmail() {
  return {
    type: CHANGE_EMAIL,
  };
}

export function changePassword() {
  return {
    type: CHANGE_PASSWORD,
  };
}
