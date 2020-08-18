import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the billingHistoryPage state domain
 */

const selectBillingHistoryPageDomain = state =>
  state.billingHistoryPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BillingHistoryPage
 */

const makeSelectBillingHistoryPage = () =>
  createSelector(
    selectBillingHistoryPageDomain,
    substate => substate,
  );

export default makeSelectBillingHistoryPage;
export { selectBillingHistoryPageDomain };
