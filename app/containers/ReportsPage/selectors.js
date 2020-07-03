import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the reportsPage state domain
 */

const selectReportsPageDomain = state => state.reportsPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectClickCount = () =>
  createSelector(
    selectReportsPageDomain,
    reportsState => reportsState.clickCount,
  );

const makeSelectClickLinkFilter = () =>
  createSelector(
    selectReportsPageDomain,
    reportsState => reportsState.clickLinkFilter,
  );

const makeSelectUserLinks = () =>
  createSelector(
    selectReportsPageDomain,
    reportsState => reportsState.userLinks,
  );

const makeSelectGetReport = () =>
  createSelector(
    selectReportsPageDomain,
    reportsState => reportsState.getReport,
  );

/**
 * Default selector used by ReportsPage
 */

const makeSelectReportsPage = () =>
  createSelector(
    selectReportsPageDomain,
    substate => substate,
  );

export default makeSelectReportsPage;
export {
  selectReportsPageDomain,
  makeSelectClickCount,
  makeSelectClickLinkFilter,
  makeSelectUserLinks,
  makeSelectGetReport,
};
