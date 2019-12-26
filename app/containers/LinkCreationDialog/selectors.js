import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the linkCreationDialog state domain
 */

const selectLinkCreationDialogDomain = state =>
  state.linkCreationDialog || initialState;

/**
 * Other specific selectors
 */
const makeSelectURI = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    linkCreationState => linkCreationState.uri,
  );

const makeSelectURIValidation = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    linkCreationState => linkCreationState.uriValidation,
  );

const makeSelectLinkDomain = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    linkCreationState => linkCreationState.linkDomain,
  );

const makeSelectSlink = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    linkCreationState => linkCreationState.sLink,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    linkCreationState => linkCreationState.loading,
  );

const makeSelectsLinkError = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    linkCreationState => linkCreationState.sLinkError,
  );

const makeSelectFetchLinkSuccess = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    linkCreationState => linkCreationState.fetchLinkSuccess,
  );
/**
 * Default selector used by LinkCreationDialog
 */

const makeSelectLinkCreationDialog = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    substate => substate,
  );

export default makeSelectLinkCreationDialog;
export {
  selectLinkCreationDialogDomain,
  makeSelectURI,
  makeSelectURIValidation,
  makeSelectLinkDomain,
  makeSelectSlink,
  makeSelectLoading,
  makeSelectsLinkError,
  makeSelectFetchLinkSuccess,
};
