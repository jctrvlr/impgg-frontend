/*
 *
 * DomainsPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_SELECTED_DOMAIN } from './constants';

export const initialState = {
  selectedDomain: [],
};

/* eslint-disable default-case, no-param-reassign */
const domainsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SELECTED_DOMAIN:
        draft.selectedDomain = action.selectedDomain;
        break;
    }
  });

export default domainsPageReducer;
