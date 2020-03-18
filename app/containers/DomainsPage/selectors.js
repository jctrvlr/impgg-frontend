import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the domainsPage state domain
 */

const selectDomainsPageDomain = state => state.domainsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DomainsPage
 */

const makeSelectDomainsPage = () =>
  createSelector(
    selectDomainsPageDomain,
    substate => substate,
  );

export default makeSelectDomainsPage;
export { selectDomainsPageDomain };
