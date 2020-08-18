/*
 *
 * CheckoutFormPage actions
 *
 */

import {
  CHANGE_PRICE_NUMBER,
  SET_PRICE,
  SET_PRICE_SUCCESS,
  SET_PRICE_ERROR,
  CHANGE_PAYMENT_METHOD_ID,
  CHANGE_INVOICE_ID,
  CREATE_SUBSCRIPTION,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_ERROR,
  CREATE_SUBSCRIPTION_REQUIRES_ACTION,
  CREATE_SUBSCRIPTION_RETRY_PAYMENT,
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_SUCCESS,
} from './constants';

export function changePriceNumber(priceNumber) {
  let price = priceNumber;
  // eslint-disable-next-line no-restricted-globals
  if ((price < 1 && price !== '') || (isNaN(price) && price !== '')) {
    price = 5;
  }
  const regex = /^\s*-?[1-9]\d*(\.\d{0,2})?\s*$/;
  if (!regex.test(price) && price !== '') {
    price = price.toFixed(2);
  }

  return {
    type: CHANGE_PRICE_NUMBER,
    price,
  };
}

export function setPrice() {
  return {
    type: SET_PRICE,
  };
}
export function setPriceSuccess(priceId) {
  return {
    type: SET_PRICE_SUCCESS,
    priceId,
  };
}

export function setPriceError(err) {
  return {
    type: SET_PRICE_ERROR,
    err,
  };
}

export function createSubscription() {
  return {
    type: CREATE_SUBSCRIPTION,
  };
}

export function createSubscriptionSuccess(subscription) {
  return {
    type: CREATE_SUBSCRIPTION_SUCCESS,
    subscription,
  };
}

export function createSubscriptionError(err) {
  return {
    type: CREATE_SUBSCRIPTION_ERROR,
    err,
  };
}

export function createSubscriptionRequiresAction(subscription) {
  return {
    type: CREATE_SUBSCRIPTION_REQUIRES_ACTION,
    subscription,
  };
}

export function authenticationFailure(err) {
  return {
    type: AUTHENTICATION_FAILURE,
    err,
  };
}

export function authenticationSuccess() {
  return {
    type: AUTHENTICATION_SUCCESS,
  };
}

export function createSubscriptionRetryPayment(subscription) {
  return {
    type: CREATE_SUBSCRIPTION_RETRY_PAYMENT,
    subscription,
  };
}

export function changePaymentMethodId(paymentMethodId) {
  return {
    type: CHANGE_PAYMENT_METHOD_ID,
    paymentMethodId,
  };
}

export function changeInvoiceId(invoiceId) {
  return {
    type: CHANGE_INVOICE_ID,
    invoiceId,
  };
}
