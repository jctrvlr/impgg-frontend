import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import request from 'utils/request';

import { baseUrl } from 'vars';

import { makeSelectUserData } from '../App/selectors';
import { makeSelectClickCount, makeSelectClickLinkFilter } from './selectors';
import {
  getClickReportSuccess,
  getClickReportError,
  getUsersLinkSuccess,
  getUsersLinkError,
} from './actions';
import { GET_CLICK_REPORT, GET_USERS_LINKS } from './constants';

/**
 * Get Click Report
 */
export function* getClickReport() {
  // Select userData from store
  const userData = yield select(makeSelectUserData());
  // Select count from store
  const count = yield select(makeSelectClickCount());
  // Select linkFilter
  const linkFilter = yield select(makeSelectClickLinkFilter());
  // eslint-disable-next-line no-underscore-dangle
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({
      limit: count,
      linkFilter,
    }),
  };
  const requestURL = `${baseUrl}v1/reports/click`;
  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);
    yield put(getClickReportSuccess(ret));
  } catch (err) {
    yield put(getClickReportError(err));
  }
}

/**
 * Get User Links
 */
export function* getUsersLinks() {
  // Select userData from store
  const userData = yield select(makeSelectUserData());
  // eslint-disable-next-line no-underscore-dangle
  const creatorId = userData.user._id;

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };

  const requestURL = `${baseUrl}v1/links?creatorId=${creatorId}`;
  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);
    yield put(getUsersLinkSuccess(ret));
  } catch (err) {
    yield put(getUsersLinkError(err));
  }
}

export default function* reportsPageSaga() {
  yield all([
    takeLatest(GET_CLICK_REPORT, getClickReport),
    takeLatest(GET_USERS_LINKS, getUsersLinks),
  ]);
}
