/**
 * Gets the repositories of the user from Github
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { FETCH_URL } from './constants';
import { fetchUrlSuccess, fetchUrlError } from './actions';

import { makeSelectURI, makeSelectURIHistory } from './selectors';
import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';

const baseUrl = `https://api.impgg.dev`;
/**
 * Registration for user request/response handler
 */
export function* fetchLink() {
  // Select URL and userData from store
  const uri = yield select(makeSelectURI());
  const uriHistory = yield select(makeSelectURIHistory());
  const userData = yield select(makeSelectUserData());
  const loggedIn = yield select(makeSelectLoggedIn());

  let requestOptions = {};
  let requestURL = '';

  if (loggedIn) {
    requestURL = `${baseUrl}/v1/link`;
    requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token.accessToken}`,
      },
      body: JSON.stringify({ uri }),
    };
  } else {
    requestURL = `${baseUrl}/juliet/link`;
    requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uri }),
    };
  }

  try {
    // Call our request helper (see 'utils/request')
    // ret should be ['creatorId', 'url', 'type', 'shortLink']
    const ret = yield call(request, requestURL, requestOptions);

    // Store user details and jwt token in local storage to keep user logged in between page refreshes
    if (uriHistory.length > 5) {
      uriHistory.shift();
    }

    uriHistory.push(ret);
    localStorage.setItem('uriHistory', JSON.stringify(uriHistory));
    // Return linkData
    yield put(fetchUrlSuccess(ret, uriHistory));
  } catch (err) {
    yield put(fetchUrlError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for authUser (login)
 */
export default function* fetchLinkWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(FETCH_URL, fetchLink);
}
