/**
 * Checkout sagas
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import request from 'utils/request';
import Cookies from 'js-cookie';

import { baseUrl } from 'vars';
import { GET_BILLING_INFO, CANCEL_SUBSCRIPTION } from './constants';

import { subscriptionEventSuccessApp } from '../App/actions';

import {
  getBillingInfoSuccess,
  getBillingInfoError,
  cancelSubscriptionSuccess,
  cancelSubscriptionError,
} from './actions';
import { makeSelectUserData } from '../App/selectors';

/**
 * Get billing info request/response handler
 */
export function* getBillingInfoSaga() {
  // Select userData from store
  const userData = yield select(makeSelectUserData());

  let requestOptions = {};
  let requestURL = '';

  requestURL = `${baseUrl}v1/payments/billing-info`;
  requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);
    // Return success
    yield put(getBillingInfoSuccess(ret));
  } catch (err) {
    yield put(getBillingInfoError(err));
  }
}

/**
 * Create domain request/response handler
 */
export function* cancelSubscriptionSaga() {
  // Select userData from store
  const userData = yield select(makeSelectUserData());

  let requestOptions = {};
  let requestURL = '';

  requestURL = `${baseUrl}v1/payments/cancel-subscription`;
  requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);
    Cookies.set('userData', JSON.stringify(ret.userData), { secure: true });
    // Return success
    yield put(cancelSubscriptionSuccess());
    yield put(
      subscriptionEventSuccessApp(ret.userData, ret.userData.user.email),
    );
  } catch (err) {
    yield put(cancelSubscriptionError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for domain
 */
export default function* billingPageWatcher() {
  yield all([
    takeLatest(GET_BILLING_INFO, getBillingInfoSaga),
    takeLatest(CANCEL_SUBSCRIPTION, cancelSubscriptionSaga),
  ]);
}
