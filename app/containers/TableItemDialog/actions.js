/*
 *
 * TableItemDialog actions
 *
 */

import {
  UPDATE_LINK,
  UPDATE_LINK_SUCCESS,
  UPDATE_LINK_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
  CHANGE_DOMAIN,
  CHANGE_SLINK,
  GEN_SLINK,
  GEN_SLINK_SUCCESS,
  GEN_SLINK_ERROR,
  RESET_FIELDS,
  LOG_SOCIAL_SHARE,
  GET_LINK_INFO,
  GET_LINK_INFO_SUCCESS,
  GET_LINK_INFO_ERROR,
  ARCHIVE_LINK,
  ARCHIVE_LINK_SUCCESS,
  ARCHIVE_LINK_ERROR,
  DELETE_LINK,
  DELETE_LINK_SUCCESS,
  DELETE_LINK_ERROR,
  RESET_STATE,
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
 * Logs social media share events
 *
 * @return {object} An action object with a type of LOG_EVENT
 */
export function logSocialMediaShare(media) {
  // eslint-disable-next-line no-console
  console.log('LOGGED SHARE TO ', media, ' button.');

  return {
    type: LOG_SOCIAL_SHARE,
    media,
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
 * Reset fields back to defaults
 *
 * @return {object} An action object with type of RESET_FIELDS
 */
export function resetFields() {
  return {
    type: RESET_FIELDS,
  };
}

/**
 * Fetch or URL, this action starts the request saga -- backend will generate or send back existing link
 *
 * @return {object} An action object with a type of FETCH_URL
 */
export function updateURL() {
  return {
    type: UPDATE_LINK,
  };
}

/**
 * Dispatched when fetching the URL is successful
 *
 * @param  {array} linkData The link data
 *
 * @return {object} An action object with a type of FETCH_URL_SUCCESS passing the URL's information along
 */
export function updateURLSuccess(currentLink) {
  return {
    type: UPDATE_LINK_SUCCESS,
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
export function updateURLError(error) {
  return {
    type: UPDATE_LINK_ERROR,
    error,
  };
}

/**
 * Delete link, this action starts the request saga -- backend will delete link
 *
 * @return {object} An action object with a type of DELETE_LINK
 */
export function deleteLink() {
  return {
    type: DELETE_LINK,
  };
}

/**
 * Dispatched when deleting the link was successful
 *
 * @param {object} deletedLink
 *
 * @return {object} An action object with a type of DELETE_LINK_SUCCESS passing the delete link info along
 */
export function deleteLinkSuccess(deletedLink) {
  return {
    type: DELETE_LINK_SUCCESS,
    deletedLink,
  };
}

/**
 * Dispatched when deleting the link failed
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of DELETE_LINK_ERROR passing the error
 */
export function deleteLinkError(error) {
  return {
    type: DELETE_LINK_ERROR,
    error,
  };
}

/**
 * Archive link, this action starts the request saga -- backend will set link to be archived or unarchived
 *
 * @return {object} An action object with a type of ARCHIVE_LINK
 */
export function archiveLink() {
  return {
    type: ARCHIVE_LINK,
  };
}

/**
 * Dispatched when archiving the link was successful
 *
 * @param {object} updatedLink
 *
 * @return {object} An action object with a type of ARCHIVE_LINK_SUCCESS passing the updated archived link's data along
 */
export function archiveLinkSuccess(newLink) {
  return {
    type: ARCHIVE_LINK_SUCCESS,
    newLink,
  };
}

/**
 * Dispatched when archiving the link failed
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of ARCHIVE_LINK_ERROR passing the error
 */
export function archiveLinkError(error) {
  return {
    type: ARCHIVE_LINK_ERROR,
    error,
  };
}

/**
 * Fetch or URL, this action starts the request saga -- backend will generate or send back existing link
 *
 * @return {object} An action object with a type of FETCH_URL
 */
export function getLinkInfo() {
  return {
    type: GET_LINK_INFO,
  };
}

/**
 * Dispatched when fetching the link info was successful
 *
 * @param  {array} linkData The link data
 *
 * @return {object} An action object with a type of FETCH_URL_SUCCESS passing the URL's information along
 */
export function getLinkInfoSuccess(linkInfo) {
  return {
    type: GET_LINK_INFO_SUCCESS,
    linkInfo,
  };
}

/**
 * Dispatched when registering the user fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of REGISTER_USER_ERROR passing the error
 */
export function getLinkInfoError(error) {
  return {
    type: GET_LINK_INFO_ERROR,
    error,
  };
}
