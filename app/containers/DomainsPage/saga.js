/**
 * Gets the repositories of the user from Github
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { baseUrl } from 'vars';
import { RELOAD_USER } from './constants';
import { reloadUserError } from './actions';

import { newUserData } from '../App/actions';
import { makeSelectUserData } from '../App/selectors';

/**
 * Registration for user request/response handler
 */
export function* reloadUser() {
  // Select URL and userData from store
  const userData = yield select(makeSelectUserData());

  const requestURL = `${baseUrl}v1/users/profile`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    // ret should be ['creatorId', 'url', 'type', 'shortLink']
    const ret = yield call(request, requestURL, requestOptions);

    userData.user = ret;

    // Store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('userData', JSON.stringify(userData));
    // Return linkData
    yield put(newUserData(userData));
  } catch (err) {
    yield put(reloadUserError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for authUser (login)
 */
export default function* domainsPageWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(RELOAD_USER, reloadUser);
}
