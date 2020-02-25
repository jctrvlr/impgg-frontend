/* eslint-disable no-underscore-dangle */
/**
 * Gets the repositories of the user from Github
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import request from 'utils/request';

import {
  UPDATE_LINK,
  GEN_SLINK,
  GET_LINK_INFO,
  ARCHIVE_LINK,
  DELETE_LINK,
} from './constants';

import {
  generateShortLinkSuccess,
  generateShortLinkError,
  updateURLSuccess,
  updateURLError,
  getLinkInfoSuccess,
  getLinkInfoError,
  archiveLinkSuccess,
  archiveLinkError,
  deleteLinkSuccess,
  deleteLinkError,
} from './actions';

import { getTableData } from '../DashboardPage/actions';

import {
  makeSelectURI,
  makeSelectLinkDomain,
  makeSelectSlink,
} from './selectors';
import { makeSelectSelectedData } from '../DashboardPage/selectors';
import { makeSelectUserData } from '../App/selectors';

const host = window.location.hostname;
const baseUrl = `http://${host}:3001`;

/**
 * Create link request/response handler
 */
export function* fetchLink() {
  // Select URL and userData from store
  const uri = yield select(makeSelectURI());
  const selectedData = yield select(makeSelectSelectedData());
  const userData = yield select(makeSelectUserData());
  let domain = yield select(makeSelectLinkDomain());
  let sLink = yield select(makeSelectSlink());

  domain = domain || null;
  sLink = sLink || null;

  let requestOptions = {};
  let requestURL = '';

  requestURL = `${baseUrl}/v1/link`;
  requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({
      linkId: selectedData[0]._id,
      uri,
      domain,
      sLink,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
    // ret should be ['creatorId', 'url', 'type', 'shortLink']
    const ret = yield call(request, requestURL, requestOptions);

    // Return linkData
    yield all([put(updateURLSuccess(ret)), put(getTableData())]);
  } catch (err) {
    const jres = yield err.response.json();
    let sLinkError;
    if (jres.message.toLowerCase().includes('short link')) {
      sLinkError = jres.message;
    }
    yield put(updateURLError(sLinkError));
  }
}

/**
 * Generate shortlink and check if unique request/response handler
 * TODO: Generate shortlink based on uri in a way that makes it unique everytime
 */
export function* genSlink() {
  // Select URL and userData from store
  const userData = yield select(makeSelectUserData());

  const sLink = Math.random()
    .toString(36)
    .substr(7, 10);

  const requestURL = `${baseUrl}/v1/link/slink`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({ sLink }),
  };

  try {
    // Call our request helper (see 'utils/request')

    // ret should be checkDup
    const ret = yield call(request, requestURL, requestOptions);

    if (ret.checkDup) genSlink();

    // Return linkData
    yield put(generateShortLinkSuccess(sLink));
  } catch (err) {
    const jres = yield err.response.json();
    yield put(generateShortLinkError(jres.message));
  }
}

/**
 * Get info about specific link
 */
export function* getLinkInfo() {
  // Select URL and userData from store
  const userData = yield select(makeSelectUserData());
  const selectedData = yield select(makeSelectSelectedData());

  const requestURL = `${baseUrl}/v1/dashboard/${selectedData[0]._id}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };

  try {
    // Call our request helper (see 'utils/request')

    // ret should be checkDup
    const ret = yield call(request, requestURL, requestOptions);

    // Return linkData
    yield put(getLinkInfoSuccess(ret[0]));
  } catch (err) {
    yield put(getLinkInfoError(err));
  }
}

/**
 * Archive a specific link
 */
export function* archiveLinkSaga() {
  // Select link and userdata for token
  const userData = yield select(makeSelectUserData());
  const selectedData = yield select(makeSelectSelectedData());

  const requestURL = `${baseUrl}/v1/link/archive`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({ linkId: selectedData[0]._id }),
  };
  console.log(requestOptions);

  try {
    const ret = yield call(request, requestURL, requestOptions);

    yield all([put(archiveLinkSuccess(ret)), put(getTableData())]);
  } catch (err) {
    console.log(err);
    yield put(archiveLinkError(err));
  }
}

/**
 * Delete a specific link
 */
export function* deleteLinkSaga() {
  // Select link and userdata for token
  const userData = yield select(makeSelectUserData());
  const selectedData = yield select(makeSelectSelectedData());

  const requestURL = `${baseUrl}/v1/link/delete`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({ linkId: selectedData[0]._id }),
  };
  console.log(requestOptions);

  try {
    const ret = yield call(request, requestURL, requestOptions);

    yield all([put(deleteLinkSuccess(ret)), put(getTableData())]);
  } catch (err) {
    console.log(err);
    yield put(deleteLinkError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for link
 */
export default function* fetchLinkWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(UPDATE_LINK, fetchLink),
    takeLatest(GEN_SLINK, genSlink),
    takeLatest(GET_LINK_INFO, getLinkInfo),
    takeLatest(ARCHIVE_LINK, archiveLinkSaga),
    takeLatest(DELETE_LINK, deleteLinkSaga),
  ]);
}
