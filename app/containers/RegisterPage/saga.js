/**
 * Gets the repositories of the user from Github
 */

import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import { REGISTER_USER } from 'containers/App/constants';
import { registerUserSuccess, registerUserError } from 'containers/App/actions';

import request from 'utils/request';

import {
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectEmail,
  makeSelectPassword,
} from './selectors';

const baseUrl = 'http://localhost:3001';

/**
 * Registration for user request/response handler
 */
export function* registerUser() {
  // Select email/password from store
  const firstName = yield select(makeSelectFirstName());
  const lastName = yield select(makeSelectLastName());
  const email = yield select(makeSelectEmail());
  const password = yield select(makeSelectPassword());
  const profile = {
    firstName,
    lastName,
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, profile }),
  };

  const requestURL = `${baseUrl}/v1/auth/register`;
  // console.log(requestOptions);

  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);

    // Store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(ret.user));
    localStorage.setItem('token', JSON.stringify(ret.token));

    yield put(registerUserSuccess(ret, email));
    yield put(push('/'));
  } catch (err) {
    yield put(registerUserError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for authUser (login)
 */
export default function* registerUserWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REGISTER_USER, registerUser);
}
