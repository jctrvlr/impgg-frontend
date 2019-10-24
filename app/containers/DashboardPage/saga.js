/**
 * Get table info saga
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { GET_TABLEDATA } from './constants';
import { tableDataSuccess, tableDataError } from './actions';

import { makeSelectUserData } from '../App/selectors';

const baseUrl = 'http://localhost:3001';

/**
 * Get table info
 */
export function* getTableInfo() {
  // Select userData from store
  const userData = yield select(makeSelectUserData());
  const creatorId = userData.user.id;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };

  const requestURL = `${baseUrl}/v1/links?creatorId=${creatorId}`;
  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);
    yield put(tableDataSuccess(ret));
  } catch (err) {
    yield put(tableDataError(err));
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
  yield takeLatest(GET_TABLEDATA, getTableInfo);
}
