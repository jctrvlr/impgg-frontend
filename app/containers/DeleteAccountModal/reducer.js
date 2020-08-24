/*
 *
 * DeleteAccountModal reducer
 *
 */
import produce from 'immer';
import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  deleteSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const deleteAccountModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DELETE_ACCOUNT:
        draft.loading = true;
        draft.deleteSuccess = false;
        break;
      case DELETE_ACCOUNT_SUCCESS:
        draft.loading = false;
        draft.deleteSuccess = true;
        break;
      case DELETE_ACCOUNT_ERROR:
        draft.loading = false;
        draft.deleteSuccess = false;
        break;
    }
  });

export default deleteAccountModalReducer;
