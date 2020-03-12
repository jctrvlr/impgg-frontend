/**
 * Get table info saga
 */

import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import request from 'utils/request';

import { baseUrl } from 'vars';
import { GET_TABLEDATA, ARCHIVE_LINK } from './constants';
import {
  tableDataSuccess,
  tableDataError,
  getTableData,
  archiveLinkSuccess,
  archiveLinkError,
} from './actions';

import { makeSelectUserData } from '../App/selectors';
import { makeSelectTableArchive, makeSelectLinkId } from './selectors';

/**
 * Get table info
 */
export function* getTableInfo() {
  // Select userData from store
  const userData = yield select(makeSelectUserData());
  let tableArchive = yield select(makeSelectTableArchive());
  if (!tableArchive) tableArchive = false;
  // eslint-disable-next-line no-underscore-dangle
  const creatorId = userData.user._id;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };

  const requestURL = `${baseUrl}v1/links?creatorId=${creatorId}&archived=${tableArchive}`;
  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);
    yield put(tableDataSuccess(ret));
  } catch (err) {
    console.log('error here', err);
    yield put(tableDataError(err));
  }
}

/**
 * Archive a specific link
 */
export function* archiveLinkSaga() {
  // Select link and userdata for token
  const userData = yield select(makeSelectUserData());
  const selectedLinkId = yield select(makeSelectLinkId());

  const requestURL = `${baseUrl}v1/link/archive`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({ linkId: selectedLinkId }),
  };

  try {
    const ret = yield call(request, requestURL, requestOptions);

    yield all([put(archiveLinkSuccess(ret)), put(getTableData())]);
  } catch (err) {
    console.log(err);
    yield put(archiveLinkError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for getTableInfo (dashboard info)
 */
export default function* getTableInfoWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(GET_TABLEDATA, getTableInfo),
    takeLatest(ARCHIVE_LINK, archiveLinkSaga),
  ]);
}
