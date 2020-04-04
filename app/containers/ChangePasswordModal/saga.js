/**
 * Authenticates user
 */

import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { baseUrl } from 'vars';
import { makeSelectLoginEmail, makeSelectPassword } from './selectors';
import { makeSelectUserData } from '../App/selectors';

import {
  authUserSuccess,
  authUserError,
  updatePasswordSuccess,
  updatePasswordError,
} from './actions';
import { AUTH_USER, UPDATE_PASSWORD } from './constants';

/**
 * Authentication for user request/response handler
 */
export function* authUser() {
  // Select email/password from store
  const email = yield select(makeSelectLoginEmail());
  const password = yield select(makeSelectPassword());
  const userData = yield select(makeSelectUserData());

  const accessToken = userData && userData.token && userData.token.accessToken;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ email, password }),
  };
  const requestURL = `${baseUrl}v1/auth`;

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);

    yield put(authUserSuccess(ret));
  } catch (err) {
    if (err && err.response) {
      const jres = yield err.response.json();
      const authUserErrorMess = jres.message;
      yield put(authUserError(authUserErrorMess));
    } else {
      yield put(authUserError(err));
    }
  }
}

/**
 * Update password
 */
export function* updatePassword() {
  // Select email/password from store
  const password = yield select(makeSelectPassword());
  const userData = yield select(makeSelectUserData());

  const accessToken = userData && userData.token && userData.token.accessToken;

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ password }),
  };
  const requestURL = `${baseUrl}v1/users/password`;

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);

    yield put(updatePasswordSuccess());
  } catch (err) {
    if (err && err.response) {
      const jres = yield err.response.json();
      const updatePasswordErrorMess = jres.message;
      yield put(updatePasswordError(updatePasswordErrorMess));
    } else {
      yield put(updatePasswordError(err));
    }
  }
}

/**
 * Root saga manages watcher lifecycle for authUser (login)
 */
export default function* changePasswordWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(AUTH_USER, authUser),
    takeLatest(UPDATE_PASSWORD, updatePassword),
  ]);
}
