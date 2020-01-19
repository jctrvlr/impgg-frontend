/*
 *
 * SecurityPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_EMAIL } from './constants';

export const initialState = {
  email: false,
};

/* eslint-disable default-case, no-param-reassign */
const securityPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;
    }
  });

export default securityPageReducer;
