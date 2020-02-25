/*
 *
 * Dashboard actions
 *
 */

import {
  GET_TABLEDATA,
  TABLEDATA_SUCCESS,
  TABLEDATA_ERROR,
  FETCH_URL,
  FETCH_URL_SUCCESS,
  FETCH_URL_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
  CHANGE_SELECTED_DATA,
  CHANGE_TABLE_ARCHIVE,
  ARCHIVE_LINK,
  ARCHIVE_LINK_SUCCESS,
  ARCHIVE_LINK_ERROR,
} from './constants';

/**
 * Archive link, this action starts the request saga -- backend will set link to be archived or unarchived
 *
 * @return {object} An action object with a type of ARCHIVE_LINK
 */
export function archiveLink(linkId) {
  return {
    type: ARCHIVE_LINK,
    linkId,
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

export function changeTableArchive(tableArchive) {
  return {
    type: CHANGE_TABLE_ARCHIVE,
    tableArchive,
  };
}

export function getTableData() {
  return {
    type: GET_TABLEDATA,
  };
}

export function tableDataSuccess(tableData) {
  let tData = tableData;
  if (!tData) {
    tData = [];
  }

  return {
    type: TABLEDATA_SUCCESS,
    tData,
  };
}

export function tableDataError(error) {
  return {
    type: TABLEDATA_ERROR,
    error,
  };
}

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

export function changeSelectedData(selectedData) {
  return {
    type: CHANGE_SELECTED_DATA,
    selectedData,
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
export function fetchUrlSuccess(currentLink, uriHistory) {
  return {
    type: FETCH_URL_SUCCESS,
    currentLink,
    uriHistory,
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
