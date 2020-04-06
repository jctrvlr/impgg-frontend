/*
 *
 * DomainRegistrationDialog reducer
 *
 */
import produce from 'immer';
import {
  ADD_DOMAIN,
  ADD_DOMAIN_SUCCESS,
  ADD_DOMAIN_ERROR,
  URI_VALIDATION,
  CHANGE_DOMAIN,
  CHANGE_SUBDOMAIN,
  RESET_STATE,
} from './constants';

export const initialState = {
  domain: '',
  subdomain: '',
  uriValidation: false,
  loading: false,
  addDomainSuccess: false,
  addDomainError: false,
};

/* eslint-disable default-case, no-param-reassign */
const domainRegistrationDialogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_DOMAIN:
        draft.domain = action.domain;
        draft.addDomainSuccess = false;
        draft.addDomainError = false;
        break;

      case CHANGE_SUBDOMAIN:
        draft.subdomain = action.subdomain;
        draft.addDomainSuccess = false;
        draft.addDomainError = false;
        break;

      case ADD_DOMAIN:
        draft.addDomainSuccess = false;
        draft.addDomainError = false;
        draft.loading = true;
        break;

      case ADD_DOMAIN_SUCCESS:
        draft.addDomainSuccess = true;
        draft.loading = false;
        draft.addDomainError = false;
        break;

      case ADD_DOMAIN_ERROR:
        draft.addDomainSuccess = false;
        draft.addDomainError = action.err;
        draft.loading = false;
        break;

      case URI_VALIDATION:
        draft.uriValidation = action.uriValidation;
        break;

      case RESET_STATE:
        draft.domain = '';
        draft.subdomain = '';
        draft.uriValidation = false;
        draft.loading = false;
        draft.addDomainSuccess = false;
        draft.addDomainError = false;
        break;
    }
  });

export default domainRegistrationDialogReducer;
