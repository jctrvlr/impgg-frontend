/*
 *
 * DomainsPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_SELECTED_DOMAIN,
  RELOAD_USER,
  RELOAD_USER_ERROR,
} from './constants';

export const initialState = {
  selectedDomain: [],
  refreshUserError: false,
};

/* eslint-disable default-case, no-param-reassign */
const domainsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SELECTED_DOMAIN:
        draft.selectedDomain = action.selectedDomain;
        break;
      case RELOAD_USER:
        break;
      case RELOAD_USER_ERROR:
        draft.refreshUserError = action.err;
        break;
    }
  });

export default domainsPageReducer;
