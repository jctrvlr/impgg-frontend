/**
 * Checkout sagas
 */

import { push } from 'connected-react-router';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import request from 'utils/request';
import Cookies from 'js-cookie';

import { baseUrl } from 'vars';
import {
  SET_PRICE,
  CREATE_SUBSCRIPTION,
  AUTHENTICATION_SUCCESS,
} from './constants';

import { subscriptionEventSuccessApp } from '../App/actions';
import {
  setPriceSuccess,
  setPriceError,
  createSubscriptionSuccess,
  createSubscriptionRequiresAction,
  createSubscriptionRetryPayment,
} from './actions';
import { makeSelectUserData } from '../App/selectors';
import {
  makeSelectPriceNumber,
  makeSelectPriceId,
  makeSelectPaymentMethodId,
} from './selectors';

/**
 * Create domain request/response handler
 */
export function* setPriceSaga() {
  // Select Domain and userData from store
  const userData = yield select(makeSelectUserData());
  const price = yield select(makeSelectPriceNumber());

  let requestOptions = {};
  let requestURL = '';

  requestURL = `${baseUrl}v1/payments/check-price`;
  requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({
      price,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);
    // Return success
    yield put(setPriceSuccess(ret.priceId));
  } catch (err) {
    yield put(setPriceError(err));
  }
}

/**
 * Create authSuccess request/response handler
 */
export function* authSuccess() {
  // Select Domain and userData from store
  const userData = yield select(makeSelectUserData());

  let requestOptions = {};
  let requestURL = '';

  requestURL = `${baseUrl}v1/users/profile`;
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
    userData.user = ret.user;
    // Return success
    Cookies.set('userData', JSON.stringify(userData), { secure: true });
    yield put(subscriptionEventSuccessApp(userData, ret.user.email));
    yield put(push('/dashboard'));
  } catch (err) {
    yield put(setPriceError(err));
  }
}

/**
 * Create createSubscription request/response handler
 */
export function* createSubscriptionSaga() {
  // Select Domain and userData from store
  const userData = yield select(makeSelectUserData());
  const priceId = yield select(makeSelectPriceId());
  const paymentMethodId = yield select(makeSelectPaymentMethodId());
  // If a previous payment was attempted, get the lastest invoice
  const latestInvoicePaymentIntentStatus = localStorage.getItem(
    'latestInvoicePaymentIntentStatus',
  );

  let requestOptions = {};
  let requestURL = '';

  if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
    const invoiceId = localStorage.getItem('latestInvoiceId');

    requestURL = `${baseUrl}v1/payments/retry-invoice`;
    requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token.accessToken}`,
      },
      body: JSON.stringify({
        paymentMethodId,
        invoiceId,
        priceId,
      }),
    };
  } else {
    requestURL = `${baseUrl}v1/payments/create-subscription`;
    requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token.accessToken}`,
      },
      body: JSON.stringify({
        paymentMethodId,
        priceId,
      }),
    };
  }

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);

    if (ret.subscription.status === 'active') {
      // If active then subscription was successful so
      // 1. Redirect to subscription success page
      // 2. Update user
      // 3. createSubscriptionSuccess
      // Store user details and jwt token in local storage to keep user logged in between page refreshes
      Cookies.set('userData', JSON.stringify(ret.userData), { secure: true });

      yield put(createSubscriptionSuccess(ret.subscription));
      yield put(
        subscriptionEventSuccessApp(ret.userData, ret.userData.user.email),
      );
    } else if (
      ret.subscription.latest_invoice.payment_intent.status ===
      'requires_action'
    ) {
      // If requires_action then payment needs confirmation
      // 1. Update user
      // 2. createSubscriptionRequiresAction
      //   1. set requiresAction true
      //   2. useEffect listen for requiresAction
      Cookies.set('userData', JSON.stringify(ret.userData), { secure: true });
      yield put(createSubscriptionRequiresAction(ret.subscription));
      yield put(
        subscriptionEventSuccessApp(ret.userData, ret.userData.user.email),
      );
    } else if (
      ret.subscription.latest_invoice.payment_intent.status ===
      'requires_payment_method'
    ) {
      // If requires_payment_method then card declined
      // 1. Update user
      // 2. set localStorage latestInvoiceId with ret.subscription.latest_invoice.id
      // 3. set localStorage latestInvoicePaymentIntentStatus ret.subscription.latest_invoice.payment_intent.status
      // 4. createSubscriptionRetryPayment
      //   1. set retryPayment true
      //   2. set error to 'Your card was declined. Please check and re-enter your card details.'
      //   3. Display error to user
      localStorage.setItem(
        'latestInvoiceId',
        ret.subscription.latest_invoice.id,
      );
      localStorage.setItem(
        'latestInvoicePaymentIntentStatus',
        ret.subscription.latest_invoice.payment_intent.status,
      );

      yield put(createSubscriptionRetryPayment());
      yield put(
        subscriptionEventSuccessApp(ret.userData, ret.userData.user.email),
      );
    } else {
      // Else return something
    }
  } catch (err) {
    const jres = yield err.response.json();
    const errMess = jres.message;
    yield put(createSubscriptionRetryPayment());
    yield put(setPriceError(errMess));
  }
}

/**
 * Root saga manages watcher lifecycle for domain
 */
export default function* checkoutFormWatcher() {
  yield all([
    takeLatest(SET_PRICE, setPriceSaga),
    takeLatest(CREATE_SUBSCRIPTION, createSubscriptionSaga),
    takeLatest(AUTHENTICATION_SUCCESS, authSuccess),
  ]);
}
