/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { baseUrl } from 'vars';
import { makeSelectEmail } from './selectors';
import { EDIT_EMAIL } from './constants';
import { makeSelectUserData } from '../App/selectors';
import { editEmailSuccessApp } from '../App/actions';
import { editEmailSuccess, editEmailError } from './actions';

/**
 * Change users email
 */
export function* editEmail() {
  // Select email/password from store
  const email = yield select(makeSelectEmail());
  const userData = yield select(makeSelectUserData());

  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({ email }),
  };

  const requestURL = `${baseUrl}v1/users/${userData.user.id}`;
  // console.log(requestOptions);

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);

    userData.user.email = email;
    // Store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('userData', JSON.stringify(userData));
    yield put(editEmailSuccess(userData, email));
    yield put(editEmailSuccessApp(userData, email));
  } catch (err) {
    const jres = yield err.response.json();
    const errorMess = jres.message;
    yield put(editEmailError(errorMess));
  }
}

/**
 * Root saga manages watcher lifecycle for authUser (login)
 */
export default function* securityPageWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(EDIT_EMAIL, editEmail);
}
