import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the domainRegistrationDialog state domain
 */

const selectDomainRegistrationDialogDomain = state =>
  state.domainRegistrationDialog || initialState;

/**
 * Other specific selectors
 */
const makeSelectDomain = () =>
  createSelector(
    selectDomainRegistrationDialogDomain,
    dashboardState => dashboardState.domain,
  );

const makeSelectSubdomain = () =>
  createSelector(
    selectDomainRegistrationDialogDomain,
    dashboardState => dashboardState.subdomain,
  );

const makeSelectURIValidation = () =>
  createSelector(
    selectDomainRegistrationDialogDomain,
    dashboardState => dashboardState.uriValidation,
  );

const makeSelectLoading = () =>
  createSelector(
    selectDomainRegistrationDialogDomain,
    dashboardState => dashboardState.loading,
  );

const makeSelectAddDomainSuccess = () =>
  createSelector(
    selectDomainRegistrationDialogDomain,
    dashboardState => dashboardState.addDomainSuccess,
  );

const makeSelectAddDomainError = () =>
  createSelector(
    selectDomainRegistrationDialogDomain,
    dashboardState => dashboardState.addDomainError,
  );

/**
 * Default selector used by DomainRegistrationDialog
 */

const makeSelectDomainRegistrationDialog = () =>
  createSelector(
    selectDomainRegistrationDialogDomain,
    substate => substate,
  );

export default makeSelectDomainRegistrationDialog;
export {
  selectDomainRegistrationDialogDomain,
  makeSelectDomain,
  makeSelectSubdomain,
  makeSelectURIValidation,
  makeSelectLoading,
  makeSelectAddDomainSuccess,
  makeSelectAddDomainError,
};
