import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the oAuthCallback state domain
 */

const selectOAuthCallbackDomain = state => state.oAuthCallback || initialState;

/**
 * Other specific selectors
 */
const makeSelectCode = () =>
  createSelector(
    selectOAuthCallbackDomain,
    oAuthCallbackState => oAuthCallbackState.code,
  );

const makeSelectService = () =>
  createSelector(
    selectOAuthCallbackDomain,
    oAuthCallbackState => oAuthCallbackState.service,
  );
/**
 * Default selector used by OAuthCallback
 */

const makeSelectOAuthCallback = () =>
  createSelector(
    selectOAuthCallbackDomain,
    substate => substate,
  );

export default makeSelectOAuthCallback;
export { selectOAuthCallbackDomain, makeSelectCode, makeSelectService };
