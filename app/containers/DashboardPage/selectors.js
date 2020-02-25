import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.dashboard || initialState;

/**
 * Other specific selectors
 */
const makeSelectTableArchive = () =>
  createSelector(
    selectDashboardDomain,
    dashboardState => dashboardState.tableArchive,
  );

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

const makeSelectNewLink = () =>
  createSelector(
    selectDashboardDomain,
    dashboardState => dashboardState.newLink,
  );

const makeSelectSelectedData = () =>
  createSelector(
    selectDashboardDomain,
    dashboardState => dashboardState.selectedData,
  );

const makeSelectLinkId = () =>
  createSelector(
    selectDashboardDomain,
    dashboardState => dashboardState.linkId,
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
  makeSelectTableArchive,
  makeSelectAlerts,
  makeSelectTableData,
  makeSelectLoading,
  makeSelectNewLink,
  makeSelectSelectedData,
  makeSelectLinkId,
};
