/*
 *
 * SecurityPage actions
 *
 */

import { CHANGE_EMAIL } from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}
