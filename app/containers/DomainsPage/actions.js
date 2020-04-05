/*
 *
 * DomainsPage actions
 *
 */

import {
  CHANGE_SELECTED_DOMAIN,
  RELOAD_USER,
  RELOAD_USER_ERROR,
} from './constants';

export function changeSelectedDomain(selectedDomain) {
  return {
    type: CHANGE_SELECTED_DOMAIN,
    selectedDomain,
  };
}

export function reloadUser() {
  return {
    type: RELOAD_USER,
  };
}

export function reloadUserError(err) {
  return {
    type: RELOAD_USER_ERROR,
    err,
  };
}
