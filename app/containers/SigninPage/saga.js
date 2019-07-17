/**
 * Registers user
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { AUTHENTICATE_USER } from 'containers/App/constants';
import { authUserSuccess, authUserError } from 'containers/App/actions';

import request from 'utils/request';

import {
  makeSelectEmail,
  makeSelectPassword,
} from 'containers/SigninPage/selectors';

const baseUrl = 'https://api.imp.gg';

/**
 * Authentication for user request/response handler
 */
export function* authUser() {
  // Select email/password from store
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  const requestURL = `${baseUrl}/v1/auth/login`;

  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(request, requestURL, requestOptions);

    // Store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));

    yield put(authUserSuccess(user, email));
  } catch (err) {
    yield put(authUserError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for authUser (login)
 */
export default function* authUserWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(AUTHENTICATE_USER, authUser);
}
