/*
 *
 * LinkCreationDialog actions
 *
 */

import {
  FETCH_URL,
  FETCH_URL_SUCCESS,
  FETCH_URL_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
  CHANGE_DOMAIN,
  CHANGE_SLINK,
  GEN_SLINK,
  GEN_SLINK_SUCCESS,
  GEN_SLINK_ERROR,
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
 * Generate shortLink for given URI
 * @returns {object} An action object with type GEN_SLINK
 */
export function generateShortLink() {
  return {
    type: GEN_SLINK,
  };
}

/**
 * Dispatched when generating a short link is successful
 * @param {String} sLink
 * @returns {object} An action object with type GEN_SLINK_ERROR
 */
export function generateShortLinkSuccess(sLink) {
  return {
    type: GEN_SLINK_SUCCESS,
    sLink,
  };
}

/**
 * Dispatched when generating a short link fails
 * @param {String} err
 * @returns {object} An action object with type GEN_SLINK_ERROR
 */
export function generateShortLinkError(sLinkError) {
  return {
    type: GEN_SLINK_ERROR,
    sLinkError,
  };
}

/**
 * Update the state with changed URI
 *
 * @return {object} An action object with a type of CHANGE_URI
 */
export function changeURI(uri) {
  return {
    type: CHANGE_URI,
    uri,
  };
}

/**
 * Update the state with changed domain for link creation
 *
 * @return {object} An action object with a type of CHANGE_DOMAIN
 */
export function changeDomain(domain) {
  return {
    type: CHANGE_DOMAIN,
    domain,
  };
}

/**
 * Update the state with changed sLink for link creation
 *
 * @return {object} An action object with a type of CHANGE_SLINK
 */
export function changeSLink(sLink) {
  return {
    type: CHANGE_SLINK,
    sLink,
  };
}

/**
 * Fetch or URL, this action starts the request saga -- backend will generate or send back existing link
 *
 * @return {object} An action object with a type of FETCH_URL
 */
export function fetchUrl() {
  return {
    type: FETCH_URL,
  };
}

/**
 * Dispatched when fetching the URL is successful
 *
 * @param  {array} linkData The link data
 *
 * @return {object} An action object with a type of FETCH_URL_SUCCESS passing the URL's information along
 */
export function fetchUrlSuccess(currentLink) {
  return {
    type: FETCH_URL_SUCCESS,
    currentLink,
  };
}

/**
 * Dispatched when registering the user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of REGISTER_USER_ERROR passing the error
 */
export function fetchUrlError(error) {
  return {
    type: FETCH_URL_ERROR,
    error,
  };
}
