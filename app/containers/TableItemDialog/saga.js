/* eslint-disable no-underscore-dangle */
/**
 * Gets the repositories of the user from Github
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import request from 'utils/request';

import { UPDATE_LINK, GEN_SLINK } from './constants';

import {
  generateShortLinkSuccess,
  generateShortLinkError,
  updateURLSuccess,
  updateURLError,
} from './actions';

import { getTableData } from '../DashboardPage/actions';

import {
  makeSelectURI,
  makeSelectLinkDomain,
  makeSelectSlink,
} from './selectors';
import { makeSelectSelectedData } from '../DashboardPage/selectors';
import { makeSelectUserData } from '../App/selectors';

const baseUrl = 'http://localhost:3001';

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
    yield put(getTableData());
    yield put(updateURLSuccess(ret));
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
  console.log(sLink);

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
    console.log(jres);
    yield put(generateShortLinkError(jres.message));
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
  ]);
}
