import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the features state domain
 */

const selectFeaturesDomain = state => state.features || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Features
 */

const makeSelectFeatures = () =>
  createSelector(
    selectFeaturesDomain,
    substate => substate,
  );

export default makeSelectFeatures;
export { selectFeaturesDomain };
