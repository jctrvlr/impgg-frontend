/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectRouter = state => state.router;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectLoggedIn = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loggedIn,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectUserData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData,
  );

export {
  selectGlobal,
  makeSelectLocation,
  makeSelectLoading,
  makeSelectLoggedIn,
  makeSelectError,
  makeSelectUserData,
};
