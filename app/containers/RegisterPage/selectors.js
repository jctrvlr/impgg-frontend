import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the registerPage state domain
 */

const selectRegisterPageDomain = state => state.registerPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectFirstName = () =>
  createSelector(
    selectRegisterPageDomain,
    homeState => homeState.firstName,
  );

const makeSelectLastName = () =>
  createSelector(
    selectRegisterPageDomain,
    homeState => homeState.lastName,
  );

const makeSelectEmail = () =>
  createSelector(
    selectRegisterPageDomain,
    homeState => homeState.email,
  );

const makeSelectPassword = () =>
  createSelector(
    selectRegisterPageDomain,
    homeState => homeState.password,
  );

const makeSelectEmailValidation = () =>
  createSelector(
    selectRegisterPageDomain,
    homeState => homeState.emailValidation,
  );

/**
 * Default selector used by RegisterPage
 */

const makeSelectRegisterPage = () =>
  createSelector(
    selectRegisterPageDomain,
    substate => substate,
  );

export {
  selectRegisterPageDomain,
  makeSelectRegisterPage,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectEmailValidation,
};
