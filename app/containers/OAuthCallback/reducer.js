/*
 *
 * OAuthCallback reducer
 *
 */
import produce from 'immer';
import { CHANGE_SERVICE, CHANGE_CODE } from './constants';

export const initialState = {
  service: null,
  code: null,
};

/* eslint-disable default-case, no-param-reassign */
const oAuthCallbackReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SERVICE:
        draft.service = action.service;
        break;

      case CHANGE_CODE:
        draft.code = action.code;
        break;
    }
  });

export default oAuthCallbackReducer;
