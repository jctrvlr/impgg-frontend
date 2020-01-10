/*
 *
 * ProfilePage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  REMOVE_PROFILE_PICTURE,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_INFO_ERROR,
} from './constants';

export const initialState = {
  firstName: false,
  lastName: false,
  pictureLoading: false,
  updateLoading: false,
  updateProfileInfoSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const profilePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_FIRST_NAME:
        draft.firstName = action.firstName;
        break;
      case CHANGE_LAST_NAME:
        draft.lastName = action.lastName;
        break;
      case REMOVE_PROFILE_PICTURE:
        draft.pictureLoading = false;
        break;
      case UPDATE_PROFILE_INFO:
        draft.updateLoading = true;
        break;
      case UPDATE_PROFILE_INFO_SUCCESS:
        draft.updateProfileInfoSuccess = true;
        draft.updateLoading = false;
        draft.userData = action.userData;
        break;
      case UPDATE_PROFILE_INFO_ERROR:
        draft.updateProfileInfoError = action.err;
        draft.updateLoading = false;
        draft.firstName = false;
        draft.lastName = false;
        break;
    }
  });

export default profilePageReducer;
