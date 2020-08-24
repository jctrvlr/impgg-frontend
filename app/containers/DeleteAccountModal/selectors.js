import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the deleteAccountModal state domain
 */

const selectDeleteAccountModalDomain = state =>
  state.deleteAccountModal || initialState;

/**
 * Other specific selectors
 */
const makeSelectLoading = () =>
  createSelector(
    selectDeleteAccountModalDomain,
    deleteAccountState => deleteAccountState.loading,
  );

const makeSelectDeleteSuccess = () =>
  createSelector(
    selectDeleteAccountModalDomain,
    deleteAccountState => deleteAccountState.deleteSuccess,
  );

/**
 * Default selector used by DeleteAccountModal
 */

const makeSelectDeleteAccountModal = () =>
  createSelector(
    selectDeleteAccountModalDomain,
    substate => substate,
  );

export default makeSelectDeleteAccountModal;
export {
  selectDeleteAccountModalDomain,
  makeSelectLoading,
  makeSelectDeleteSuccess,
};
