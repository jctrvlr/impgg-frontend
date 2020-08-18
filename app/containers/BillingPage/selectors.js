import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the billingPage state domain
 */

const selectBillingPageDomain = state => state.billingPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectPaymentMethod = () =>
  createSelector(
    selectBillingPageDomain,
    billingPageState => billingPageState.paymentMethod,
  );

const makeSelectLoading = () =>
  createSelector(
    selectBillingPageDomain,
    billingPageState => billingPageState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectBillingPageDomain,
    billingPageState => billingPageState.error,
  );

const makeSelectSubscriptionInvoice = () =>
  createSelector(
    selectBillingPageDomain,
    billingPageState => billingPageState.subscriptionInvoice,
  );

const makeSelectCancelSuccess = () =>
  createSelector(
    selectBillingPageDomain,
    billingPageState => billingPageState.cancelSuccess,
  );

const makeSelectCancelError = () =>
  createSelector(
    selectBillingPageDomain,
    billingPageState => billingPageState.cancelError,
  );
/**
 * Default selector used by BillingPage
 */

const makeSelectBillingPage = () =>
  createSelector(
    selectBillingPageDomain,
    substate => substate,
  );

export default makeSelectBillingPage;
export {
  selectBillingPageDomain,
  makeSelectPaymentMethod,
  makeSelectLoading,
  makeSelectError,
  makeSelectSubscriptionInvoice,
  makeSelectCancelSuccess,
  makeSelectCancelError,
};
