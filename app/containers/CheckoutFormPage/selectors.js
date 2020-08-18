import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the checkoutFormPage state domain
 */

const selectCheckoutFormPageDomain = state =>
  state.checkoutFormPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectPriceNumber = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.priceNumber,
  );

const makeSelectPriceId = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.priceId,
  );

const makeSelectPaymentMethodId = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.paymentMethodId,
  );

const makeSelectSubscription = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.subscription,
  );

const makeSelectInvoice = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.invoice,
  );

const makeSelectLoading = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.loading,
  );

const makeSelectRequiresAction = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.requiresAction,
  );

const makeSelectRetryPayment = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.retryPayment,
  );

const makeSelectSetPrice = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    checkoutFormState => checkoutFormState.setPriceBool,
  );

/**
 * Default selector used by CheckoutFormPage
 */

const makeSelectCheckoutFormPage = () =>
  createSelector(
    selectCheckoutFormPageDomain,
    substate => substate,
  );

export default makeSelectCheckoutFormPage;
export {
  selectCheckoutFormPageDomain,
  makeSelectPriceNumber,
  makeSelectPriceId,
  makeSelectPaymentMethodId,
  makeSelectSubscription,
  makeSelectLoading,
  makeSelectRequiresAction,
  makeSelectRetryPayment,
  makeSelectSetPrice,
  makeSelectInvoice,
};
