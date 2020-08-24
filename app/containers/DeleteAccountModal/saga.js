/**
 * Authenticates user
 */

import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { baseUrl } from 'vars';
import { makeSelectUserData } from '../App/selectors';

import { deleteAccountSuccess, deleteAccountError } from './actions';
import { DELETE_ACCOUNT } from './constants';

/**
 * Update password
 */
export function* deleteAccountSaga() {
  // Select email/password from store
  const userData = yield select(makeSelectUserData());

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };
  const requestURL = `${baseUrl}v1/users/reset`;

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);

    yield put(deleteAccountSuccess());
  } catch (err) {
    yield put(deleteAccountError());
  }
}

/**
 * Root saga manages watcher lifecycle for authUser (login)
 */
export default function* deleteAccountSagaWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([takeLatest(DELETE_ACCOUNT, deleteAccountSaga)]);
}
