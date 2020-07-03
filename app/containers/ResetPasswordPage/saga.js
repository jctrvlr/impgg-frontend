/**
 * Sends resetPassword request to backend with users input email
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import request from 'utils/request';

import { baseUrl } from 'vars';
import { RESET_PASSWORD, SET_NEW_PASSWORD } from './constants';
import { resetPasswordSuccess, resetPasswordError } from './actions';

import {
  makeSelectEmail,
  makeSelectTok,
  makeSelectPassword,
} from './selectors';

/**
 * Send initial reset password request
 */
export function* resetPassword() {
  // Select URL and userData from store
  const email = yield select(makeSelectEmail());

  const requestURL = `${baseUrl}v1/auth/recover`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  };

  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);
    yield put(resetPasswordSuccess(ret.message));
  } catch (err) {
    yield put(resetPasswordError(err.error));
  }
}

/**
 * Send reset password token with new passowrd to be saved
 */
export function* setNewPassword() {
  // Select URL and userData from store
  const token = yield select(makeSelectTok());
  const password = yield select(makeSelectPassword());

  const requestURL = `${baseUrl}v1/auth/reset-password`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password }),
  };

  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);
    yield put(resetPasswordSuccess(ret.message));
  } catch (err) {
    yield put(resetPasswordError(err.error));
  }
}

/**
 * Root saga manages watcher lifecycle for resetPassword
 */
export default function* resetPasswordWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(RESET_PASSWORD, resetPassword),
    takeLatest(SET_NEW_PASSWORD, setNewPassword),
  ]);
}
