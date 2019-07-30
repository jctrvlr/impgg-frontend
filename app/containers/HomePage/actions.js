/*
 *
 * HomePage actions
 *
 */

import {
  FETCH_URL,
  FETCH_URL_SUCCESS,
  FETCH_URL_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
} from './constants';

/**
 * Validate URI to ensure it is a valid URI
 *
 * @return {object} An action object with a type of URI_VALIDATION
 */
export function validateURI(uri) {
  /* eslint-disable no-useless-escape */
  const uriRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
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
 * Update the state with changed URI
 *
 * @return {object} An action object with a type of URI_VALIDATION
 */
export function changeURI(uri) {
  return {
    type: CHANGE_URI,
    uri,
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
export function fetchUrlSuccess(linkData, currentLink) {
  return {
    type: FETCH_URL_SUCCESS,
    linkData,
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
