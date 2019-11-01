import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */
const makeSelectAlerts = () =>
  createSelector(
    selectDashboardDomain,
    dashboardState => dashboardState.alerts,
  );

const makeSelectTableData = () =>
  createSelector(
    selectDashboardDomain,
    dashboardState => dashboardState.tableData,
  );

const makeSelectLoading = () =>
  createSelector(
    selectDashboardDomain,
    dashboardState => dashboardState.loading,
  );

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(
    selectDashboardDomain,
    substate => substate,
  );

export default makeSelectDashboard;
export {
  selectDashboardDomain,
  makeSelectAlerts,
  makeSelectTableData,
  makeSelectLoading,
};
