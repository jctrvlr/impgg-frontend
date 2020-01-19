import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the securityPage state domain
 */

const selectSecurityPageDomain = state => state.securityPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectEmail = () =>
  createSelector(
    selectSecurityPageDomain,
    linkCreationState => linkCreationState.email,
  );

/**
 * Default selector used by SecurityPage
 */

const makeSelectSecurityPage = () =>
  createSelector(
    selectSecurityPageDomain,
    substate => substate,
  );

export default makeSelectSecurityPage;
export { selectSecurityPageDomain, makeSelectEmail };
