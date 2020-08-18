/*
 *
 * BillingPage actions
 *
 */

import {
  GET_BILLING_INFO,
  GET_BILLING_INFO_SUCCESS,
  GET_BILLING_INFO_ERROR,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_ERROR,
  CANCEL_SUBSCRIPTION_CLEANUP,
} from './constants';

export function getBillingInfo() {
  return {
    type: GET_BILLING_INFO,
  };
}

export function getBillingInfoSuccess(info) {
  return {
    type: GET_BILLING_INFO_SUCCESS,
    info,
  };
}

export function getBillingInfoError(error) {
  return {
    type: GET_BILLING_INFO_ERROR,
    error,
  };
}

export function cancelSubscription() {
  return {
    type: CANCEL_SUBSCRIPTION,
  };
}

export function cancelSubscriptionSuccess() {
  return {
    type: CANCEL_SUBSCRIPTION_SUCCESS,
  };
}

export function cancelSubscriptionError(error) {
  return {
    type: CANCEL_SUBSCRIPTION_ERROR,
    error,
  };
}

export function cancelSubscriptionCleanup() {
  return {
    type: CANCEL_SUBSCRIPTION_CLEANUP,
  };
}
