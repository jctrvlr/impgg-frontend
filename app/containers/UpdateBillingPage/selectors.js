import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the updateBillingPage state domain
 */

const selectUpdateBillingPageDomain = state =>
  state.updateBillingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UpdateBillingPage
 */

const makeSelectUpdateBillingPage = () =>
  createSelector(
    selectUpdateBillingPageDomain,
    substate => substate,
  );

export default makeSelectUpdateBillingPage;
export { selectUpdateBillingPageDomain };
