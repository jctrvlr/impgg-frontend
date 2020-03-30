/* eslint-disable no-underscore-dangle */
/**
 * Gets the repositories of the user from Github
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import moment from 'moment';
import request from 'utils/request';

import { baseUrl } from 'vars';
import { DELETE_DOMAIN } from './constants';

import { newUserData } from '../App/actions';
import { deleteDomainSuccess, deleteDomainError } from './actions';

import { makeSelectSelectedDomain } from '../DomainsPage/selectors';
import { makeSelectUserData } from '../App/selectors';

/**
 * Delete a specific link
 */
export function* deleteDomainSaga() {
  // Select link and userdata for token
  const userData = yield select(makeSelectUserData());
  const selectedDomain = yield select(makeSelectSelectedDomain());

  const requestURL = `${baseUrl}v1/domain`;
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({ domainId: selectedDomain[0]._id }),
  };

  try {
    const ret = yield call(request, requestURL, requestOptions);
    userData.user = ret;
    userData.expires = moment
      .utc()
      .add(1, 'day')
      .toDate()
      .toUTCString();

    // Store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('userData', JSON.stringify(userData));

    yield all([put(deleteDomainSuccess(ret)), put(newUserData(userData))]);
  } catch (err) {
    console.log(err);
    yield put(deleteDomainError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for domain
 */
export default function* fetchLinkWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([takeLatest(DELETE_DOMAIN, deleteDomainSaga)]);
}
