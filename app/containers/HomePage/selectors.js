import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

const makeSelectURI = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.uri,
  );

const makeSelectURIHistory = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.uriHistory,
  );

const makeSelectURIValidation = () =>
  createSelector(
    selectHomePageDomain,
    homeState => homeState.uriValidation,
  );

const makeSelectSlink = () =>
  createSelector(
    selectHomePageDomain,
    linkCreationState => linkCreationState.sLink,
  );

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectURI,
  makeSelectURIHistory,
  makeSelectURIValidation,
  makeSelectSlink,
};
