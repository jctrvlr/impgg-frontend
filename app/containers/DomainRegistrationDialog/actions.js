/*
 *
 * TableItemDialog actions
 *
 */

import {
  ADD_DOMAIN,
  URI_VALIDATION,
  ADD_DOMAIN_SUCCESS,
  ADD_DOMAIN_ERROR,
  CHANGE_DOMAIN,
  CHANGE_SUBDOMAIN,
  RESET_STATE,
} from './constants';

/**
 * Validate URI to ensure it is a valid URI
 *
 * @return {object} An action object with a type of URI_VALIDATION
 */
export function validateURI(uri) {
  /* eslint-disable no-useless-escape */
  const uriRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,9}(:[0-9]{1,5})?(\/.*)?$/gm;
  let uriValidation = '';

  if (uriRegex.test(uri)) {
    uriValidation = false;
  } else {
    uriValidation = 'Enter a valid URL';
  }
  return {
    type: URI_VALIDATION,
    uriValidation,
  };
}

/**
 * Reset state
 *
 * @return {object} An action object with type of RESET_STATE
 */
export function resetState() {
  return {
    type: RESET_STATE,
  };
}

/**
 * Changes domain
 *
 * @return {object} An action object with type of CHANGE_DOMAIN
 */
export function changeDomain(domain) {
  return {
    type: CHANGE_DOMAIN,
    domain,
  };
}

/**
 * Changes subdomain
 *
 * @return {object} An action object with type of CHANGE_DOMAIN
 */
export function changeSubdomain(subdomain) {
  return {
    type: CHANGE_SUBDOMAIN,
    subdomain,
  };
}

/**
 * Adds unconfirmed Domain
 *
 * @return {object} An action object with a type of ADD_DOMAIN
 */
export function addDomain() {
  return {
    type: ADD_DOMAIN,
  };
}

/**
 * Add domain success
 *
 * @return {object} An action object with a type of ADD_DOMAIN
 */
export function addDomainSuccess() {
  return {
    type: ADD_DOMAIN_SUCCESS,
  };
}

/**
 * Add domain error
 *
 * @return {object} An action object with a type of ADD_DOMAIN
 */
export function addDomainError(err) {
  return {
    type: ADD_DOMAIN_ERROR,
    err,
  };
}
