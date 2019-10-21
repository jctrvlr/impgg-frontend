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
    homeState => homeState.uri,
  );

const makeSelectURIHistory = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    homeState => homeState.uriHistory,
  );

const makeSelectURIValidation = () =>
  createSelector(
    selectLinkCreationDialogDomain,
    homeState => homeState.uriValidation,
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
  makeSelectURIHistory,
  makeSelectURIValidation,
};
