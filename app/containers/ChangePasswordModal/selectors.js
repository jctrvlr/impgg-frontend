import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePasswordModal state domain
 */

const selectChangePasswordModalDomain = state =>
  state.changePasswordModal || initialState;

/**
 * Other specific selectors
 */
const makeSelectLoginEmail = () =>
  createSelector(
    selectChangePasswordModalDomain,
    changePasswordState => changePasswordState.loginEmail,
  );

const makeSelectPassword = () =>
  createSelector(
    selectChangePasswordModalDomain,
    changePasswordState => changePasswordState.password,
  );

const makeSelectLoginError = () =>
  createSelector(
    selectChangePasswordModalDomain,
    changePasswordState => changePasswordState.loginError,
  );

const makeSelectLoading = () =>
  createSelector(
    selectChangePasswordModalDomain,
    changePasswordState => changePasswordState.loading,
  );

const makeSelectAuthSuccess = () =>
  createSelector(
    selectChangePasswordModalDomain,
    changePasswordState => changePasswordState.authSuccess,
  );

const makeSelectChangeSuccess = () =>
  createSelector(
    selectChangePasswordModalDomain,
    changePasswordState => changePasswordState.changeSuccess,
  );

/**
 * Default selector used by ChangePasswordModal
 */

const makeSelectChangePasswordModal = () =>
  createSelector(
    selectChangePasswordModalDomain,
    substate => substate,
  );

export default makeSelectChangePasswordModal;
export {
  selectChangePasswordModalDomain,
  makeSelectLoginEmail,
  makeSelectLoading,
  makeSelectPassword,
  makeSelectLoginError,
  makeSelectAuthSuccess,
  makeSelectChangeSuccess,
};
