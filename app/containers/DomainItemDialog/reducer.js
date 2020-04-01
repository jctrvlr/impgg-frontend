/*
 *
 * DomainItemDialog reducer
 *
 */
import produce from 'immer';
import {
  DELETE_DOMAIN,
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  deleteDomainSuccess: false,
  deleteDomainError: false,
};

/* eslint-disable default-case, no-param-reassign */
const domainItemDialogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DELETE_DOMAIN:
        draft.loading = true;
        draft.deleteDomainSuccess = false;
        draft.deleteDomainError = false;
        break;

      case DELETE_DOMAIN_SUCCESS:
        draft.loading = false;
        draft.deleteDomainSuccess = true;
        break;

      case DELETE_DOMAIN_ERROR:
        draft.loading = false;
        draft.deleteDomainError = action.error;
        break;
    }
  });

export default domainItemDialogReducer;
