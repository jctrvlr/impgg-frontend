/*
 *
 * DomainItemDialog reducer
 *
 */
import produce from 'immer';
import {
  ADD_DOMAIN,
  ADD_DOMAIN_SUCCESS,
  ADD_DOMAIN_ERROR,
  URI_VALIDATION,
} from './constants';

export const initialState = {
  domain: '',
  uriValidation: false,
  loading: false,
  addDomainSuccess: false,
  addDomainError: false,
};

/* eslint-disable default-case, no-param-reassign */
const tableItemDialogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_DOMAIN:
        draft.domain = action.domain;
        draft.addDomainSuccess = false;
        break;

      case ADD_DOMAIN_SUCCESS:
        draft.addDomainSuccess = true;
        break;

      case ADD_DOMAIN_ERROR:
        draft.addDomainSuccess = false;
        draft.addDomainError = action.err;
        break;

      case URI_VALIDATION:
        draft.uriValidation = action.uriValidation;
        break;
    }
  });

export default tableItemDialogReducer;
