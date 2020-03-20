/*
 *
 * DomainsPage actions
 *
 */

import { CHANGE_SELECTED_DOMAIN } from './constants';

export function changeSelectedDomain(selectedDomain) {
  return {
    type: CHANGE_SELECTED_DOMAIN,
    selectedDomain,
  };
}
