import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the contactPage state domain
 */

const selectContactPageDomain = state => state.contactPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectEmail = () =>
  createSelector(
    selectContactPageDomain,
    contactState => contactState.email,
  );

const makeSelectSubject = () =>
  createSelector(
    selectContactPageDomain,
    contactState => contactState.subject,
  );

const makeSelectMessage = () =>
  createSelector(
    selectContactPageDomain,
    contactState => contactState.message,
  );

const makeSelectError = () =>
  createSelector(
    selectContactPageDomain,
    contactState => contactState.error,
  );

const makeSelectLoading = () =>
  createSelector(
    selectContactPageDomain,
    contactState => contactState.loading,
  );

const makeSelectMessageSuccess = () =>
  createSelector(
    selectContactPageDomain,
    contactState => contactState.messageSuccess,
  );

/**
 * Default selector used by ContactPage
 */

const makeSelectContactPage = () =>
  createSelector(
    selectContactPageDomain,
    substate => substate,
  );

export default makeSelectContactPage;
export {
  selectContactPageDomain,
  makeSelectEmail,
  makeSelectSubject,
  makeSelectMessage,
  makeSelectError,
  makeSelectMessageSuccess,
  makeSelectLoading,
};
