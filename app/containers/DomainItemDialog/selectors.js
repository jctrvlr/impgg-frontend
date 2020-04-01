import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the domainItemDialog state domain
 */

const selectDomainItemDialogDomain = state =>
  state.domainItemDialog || initialState;

/**
 * Other specific selectors
 */
const makeSelectLoading = () =>
  createSelector(
    selectDomainItemDialogDomain,
    linkCreationState => linkCreationState.loading,
  );

const makeSelectDeleteDomainSuccess = () =>
  createSelector(
    selectDomainItemDialogDomain,
    linkCreationState => linkCreationState.deleteDomainSuccess,
  );

const makeSelectDeleteDomainError = () =>
  createSelector(
    selectDomainItemDialogDomain,
    linkCreationState => linkCreationState.deleteDomainError,
  );

/**
 * Default selector used by DomainItemDialog
 */

const makeSelectDomainItemDialog = () =>
  createSelector(
    selectDomainItemDialogDomain,
    substate => substate,
  );

export default makeSelectDomainItemDialog;
export {
  selectDomainItemDialogDomain,
  makeSelectDeleteDomainSuccess,
  makeSelectDeleteDomainError,
  makeSelectLoading,
};
