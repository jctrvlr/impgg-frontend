/*
 *
 * BillingPage reducer
 *
 */
import produce from 'immer';
import {
  GET_BILLING_INFO,
  GET_BILLING_INFO_SUCCESS,
  GET_BILLING_INFO_ERROR,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_ERROR,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_CLEANUP,
} from './constants';

export const initialState = {
  paymentMethod: false,
  subscriptionInvoice: false,
  error: false,
  loading: false,
  cancelSuccess: false,
  cancelError: false,
};

/* eslint-disable default-case, no-param-reassign */
const billingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_BILLING_INFO:
        draft.paymentMethod = false;
        draft.subscriptionInvoice = false;
        draft.error = false;
        draft.loading = true;
        draft.cancelSuccess = false;
        draft.cancelError = false;
        break;

      case GET_BILLING_INFO_SUCCESS:
        draft.paymentMethod = action.info.paymentMethod;
        draft.subscriptionInvoice = action.info.invoice;
        draft.loading = false;
        break;

      case GET_BILLING_INFO_ERROR:
        draft.error = action.error;
        draft.paymentMethod = false;
        draft.subscriptionInvoice = false;
        draft.loading = false;
        break;

      case CANCEL_SUBSCRIPTION:
        draft.error = false;
        draft.loading = true;
        draft.cancelSuccess = false;
        draft.cancelError = false;
        break;

      case CANCEL_SUBSCRIPTION_SUCCESS:
        draft.cancelSuccess = true;
        draft.cancelError = false;
        draft.loading = false;
        break;

      case CANCEL_SUBSCRIPTION_ERROR:
        draft.cancelSuccess = false;
        draft.cancelError = action.error;
        draft.loading = false;
        break;

      case CANCEL_SUBSCRIPTION_CLEANUP:
        draft.paymentMethod = false;
        draft.subscriptionInvoice = false;
        draft.error = false;
        draft.loading = true;
        draft.cancelSuccess = false;
        draft.cancelError = false;
        break;
    }
  });

export default billingPageReducer;
