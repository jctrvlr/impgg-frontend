import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sorryPage state domain
 */

const selectSorryPageDomain = state => state.sorryPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SorryPage
 */

const makeSelectSorryPage = () =>
  createSelector(
    selectSorryPageDomain,
    substate => substate,
  );

export default makeSelectSorryPage;
export { selectSorryPageDomain };
