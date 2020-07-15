/*
 *
 * OAuthCallback actions
 *
 */

import { CHANGE_SERVICE, CHANGE_CODE } from './constants';

export function changeService(service) {
  return {
    type: CHANGE_SERVICE,
    service,
  };
}

export function changeCode(code) {
  return {
    type: CHANGE_CODE,
    code,
  };
}
