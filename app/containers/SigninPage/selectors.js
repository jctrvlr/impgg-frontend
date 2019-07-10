import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signinPage state domain
 */

const selectSigninPageDomain = state => state.signinPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectEmail = () =>
  createSelector(
    selectSigninPageDomain,
    homeState => homeState.email,
  );

const makeSelectPassword = () =>
  createSelector(
    selectSigninPageDomain,
    homeState => homeState.password,
  );
/**
 * Default selector used by SigninPage
 */

const makeSelectSigninPage = () =>
  createSelector(
    selectSigninPageDomain,
    substate => substate,
  );

export default makeSelectSigninPage;
export { selectSigninPageDomain, makeSelectEmail, makeSelectPassword };
