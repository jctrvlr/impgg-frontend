import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tableItemDialog state domain
 */

const selectTableItemDialogDomain = state =>
  state.tableItemDialog || initialState;

/**
 * Other specific selectors
 */
const makeSelectURI = () =>
  createSelector(
    selectTableItemDialogDomain,
    linkCreationState => linkCreationState.uri,
  );

const makeSelectURIValidation = () =>
  createSelector(
    selectTableItemDialogDomain,
    linkCreationState => linkCreationState.uriValidation,
  );

const makeSelectLinkDomain = () =>
  createSelector(
    selectTableItemDialogDomain,
    linkCreationState => linkCreationState.linkDomain,
  );

const makeSelectSlink = () =>
  createSelector(
    selectTableItemDialogDomain,
    linkCreationState => linkCreationState.sLink,
  );

const makeSelectLoading = () =>
  createSelector(
    selectTableItemDialogDomain,
    linkCreationState => linkCreationState.loading,
  );

const makeSelectsLinkError = () =>
  createSelector(
    selectTableItemDialogDomain,
    linkCreationState => linkCreationState.sLinkError,
  );

const makeSelectFetchLinkSuccess = () =>
  createSelector(
    selectTableItemDialogDomain,
    linkCreationState => linkCreationState.fetchLinkSuccess,
  );

const makeSelectLinkInfo = () =>
  createSelector(
    selectTableItemDialogDomain,
    linkCreationState => linkCreationState.linkInfo,
  );
/**
 * Default selector used by TableItemDialog
 */

const makeSelectTableItemDialog = () =>
  createSelector(
    selectTableItemDialogDomain,
    substate => substate,
  );

export default makeSelectTableItemDialog;
export {
  selectTableItemDialogDomain,
  makeSelectURI,
  makeSelectURIValidation,
  makeSelectLinkDomain,
  makeSelectSlink,
  makeSelectLoading,
  makeSelectsLinkError,
  makeSelectFetchLinkSuccess,
  makeSelectLinkInfo,
};
