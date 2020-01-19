import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profilePage state domain
 */

const selectProfilePageDomain = state => state.profilePage || initialState;

/**
 * Other specific selectors
 */
const makeSelectFirstName = () =>
  createSelector(
    selectProfilePageDomain,
    linkCreationState => linkCreationState.firstName,
  );

const makeSelectLastName = () =>
  createSelector(
    selectProfilePageDomain,
    linkCreationState => linkCreationState.lastName,
  );

const makeSelectUpdateLoading = () =>
  createSelector(
    selectProfilePageDomain,
    linkCreationState => linkCreationState.updateLoading,
  );

const makeSelectUpdateProfileInfoSuccess = () =>
  createSelector(
    selectProfilePageDomain,
    linkCreationState => linkCreationState.updateProfileInfoSuccess,
  );

/**
 * Default selector used by ProfilePage
 */

const makeSelectProfilePage = () =>
  createSelector(
    selectProfilePageDomain,
    substate => substate,
  );

export default makeSelectProfilePage;
export {
  selectProfilePageDomain,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectUpdateLoading,
  makeSelectUpdateProfileInfoSuccess,
};
