/*
 *
 * ContactPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_EMAIL,
  CHANGE_SUBJECT,
  CHANGE_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from './constants';

export const initialState = {
  email: '',
  subject: '',
  message: '',
  error: false,
  messageSuccess: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const contactPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;

      case CHANGE_SUBJECT:
        draft.subject = action.subject;
        break;

      case CHANGE_MESSAGE:
        draft.message = action.message;
        break;

      case SEND_MESSAGE:
        draft.messageSuccess = false;
        draft.error = false;
        draft.loading = true;
        break;

      case SEND_MESSAGE_SUCCESS:
        draft.messageSuccess = true;
        draft.error = false;
        draft.loading = false;
        break;

      case SEND_MESSAGE_ERROR:
        draft.messageSuccess = false;
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default contactPageReducer;
