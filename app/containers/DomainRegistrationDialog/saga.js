/**
 * Gets the repositories of the user from Github
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import request from 'utils/request';
import moment from 'moment';

import { baseUrl } from 'vars';
import { ADD_DOMAIN } from './constants';

import { addDomainSuccess, addDomainError } from './actions';
import { newUserData } from '../App/actions';
import { makeSelectDomain } from './selectors';

import { makeSelectUserData } from '../App/selectors';

/**
 * Create domain request/response handler
 */
export function* addDomainSaga() {
  // Select Domain and userData from store
  const userData = yield select(makeSelectUserData());
  let domain = yield select(makeSelectDomain());

  domain = domain || null;

  let requestOptions = {};
  let requestURL = '';

  requestURL = `${baseUrl}v1/domain`;
  requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({
      uri: domain,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
    // ret should be ['creatorId', 'url', 'type', 'shortLink']
    const ret = yield call(request, requestURL, requestOptions);
    userData.user = ret;
    userData.expires = moment
      .utc()
      .add(1, 'day')
      .toDate()
      .toUTCString();

    // Store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('userData', JSON.stringify(userData));

    // Return linkData
    yield all([put(addDomainSuccess(ret)), put(newUserData(userData))]);
  } catch (err) {
    const jres = yield err.response.json();
    const error = jres.message;
    yield put(addDomainError(error));
  }
}

/**
 * Root saga manages watcher lifecycle for domain
 */
export default function* fetchLinkWatcher() {
  yield all([takeLatest(ADD_DOMAIN, addDomainSaga)]);
}
