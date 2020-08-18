/*
 *
 * CheckoutFormPage reducer
 *
 */
import produce from 'immer';
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

export const initialState = {
  priceNumber: 5,
  priceId: false,
  error: false,
  loading: false,
  subscription: false,
  requiresAction: false,
  retryPayment: false,
  setPriceBool: false,
};

/* eslint-disable default-case, no-param-reassign */
const checkoutFormPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_PRICE_NUMBER:
        draft.priceNumber = action.price;
        break;

      case SET_PRICE:
        draft.loading = true;
        draft.error = false;
        break;

      case SET_PRICE_SUCCESS:
        draft.priceId = action.priceId;
        draft.setPriceBool = true;
        draft.loading = false;
        break;

      case SET_PRICE_ERROR:
        draft.error = action.err;
        draft.loading = false;
        break;

      case CHANGE_PAYMENT_METHOD_ID:
        draft.paymentMethodId = action.paymentMethodId;
        break;

      case CHANGE_INVOICE_ID:
        draft.invoiceId = action.invoiceId;
        break;

      case CREATE_SUBSCRIPTION:
        draft.loading = true;
        draft.subscription = false;
        draft.requiresAction = false;
        draft.retryPayment = false;
        draft.error = false;
        break;

      case CREATE_SUBSCRIPTION_SUCCESS:
        draft.loading = false;
        draft.requiresAction = false;
        draft.subscription = action.subscription;
        draft.retryPayment = false;
        draft.error = false;
        break;

      case CREATE_SUBSCRIPTION_ERROR:
        draft.loading = false;
        draft.subscription = false;
        draft.requiresAction = false;
        draft.retryPayment = false;
        draft.error = action.err;
        break;

      case CREATE_SUBSCRIPTION_REQUIRES_ACTION:
        draft.loading = true;
        draft.subscription = action.subscription;
        draft.retryPayment = false;
        draft.requiresAction = true;
        draft.error = 'Please confirm your card information!';
        break;

      case CREATE_SUBSCRIPTION_RETRY_PAYMENT:
        draft.loading = false;
        draft.requiresAction = false;
        draft.retryPayment =
          'Your card was declined. Please check and re-enter your card details.';
        break;

      case AUTHENTICATION_FAILURE:
        draft.error = action.err;
        break;

      case AUTHENTICATION_SUCCESS:
        draft.error = false;
        draft.requiresAction = false;
    }
  });

export default checkoutFormPageReducer;
