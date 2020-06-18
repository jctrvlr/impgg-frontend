import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import request from 'utils/request';

import { baseUrl } from 'vars';

import { makeSelectUserData } from '../App/selectors';
import { makeSelectClickCount, makeSelectClickLinkFilter } from './selectors';
import { getClickReportSuccess, getClickReportError } from './actions';
import { GET_CLICK_REPORT } from './constants';

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
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: {
      limit: count,
      linkFilter,
    },
  };

  const requestURL = `${baseUrl}v1/reports/click?limit=${count}`;
  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);
    yield put(getClickReportSuccess(ret));
  } catch (err) {
    yield put(getClickReportError(err));
  }
}

export default function* reportsPageSaga() {
  yield all([takeLatest(GET_CLICK_REPORT, getClickReport)]);
}
