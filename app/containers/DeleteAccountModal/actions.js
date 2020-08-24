/*
 *
 * ChangePasswordModal actions
 *
 */

import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
} from './constants';

export function deleteAccount() {
  return {
    type: DELETE_ACCOUNT,
  };
}

export function deleteAccountSuccess() {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
  };
}

export function deleteAccountError() {
  return {
    type: DELETE_ACCOUNT_ERROR,
  };
}
