import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the resetPasswordPage state domain
 */

const selectResetPasswordPageDomain = state =>
  state.resetPasswordPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectEmail = () =>
  createSelector(
    selectResetPasswordPageDomain,
    homeState => homeState.email,
  );

const makeSelectTok = () =>
  createSelector(
    selectResetPasswordPageDomain,
    homeState => homeState.tok,
  );

const makeSelectPassword = () =>
  createSelector(
    selectResetPasswordPageDomain,
    homeState => homeState.password,
  );

const makeSelectEmailValidation = () =>
  createSelector(
    selectResetPasswordPageDomain,
    homeState => homeState.emailValidation,
  );

const makeSelectResetPasswordMessage = () =>
  createSelector(
    selectResetPasswordPageDomain,
    homeState => homeState.resetPasswordMessage,
  );

const makeSelectLoading = () =>
  createSelector(
    selectResetPasswordPageDomain,
    homeState => homeState.loading,
  );
/**
 * Default selector used by ResetPasswordPage
 */

const makeSelectResetPasswordPage = () =>
  createSelector(
    selectResetPasswordPageDomain,
    substate => substate,
  );

export default makeSelectResetPasswordPage;
export {
  selectResetPasswordPageDomain,
  makeSelectEmail,
  makeSelectEmailValidation,
  makeSelectResetPasswordMessage,
  makeSelectLoading,
  makeSelectTok,
  makeSelectPassword,
};
