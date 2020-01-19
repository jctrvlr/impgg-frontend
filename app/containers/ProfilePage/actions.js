/*
 *
 * ProfilePage actions
 *
 */

import {
  CHANGE_FIRST_NAME,
  CHANGE_LAST_NAME,
  REMOVE_PROFILE_PICTURE,
  REMOVE_PROFILE_PICTURE_SUCCESS,
  REMOVE_PROFILE_PICTURE_ERROR,
  UPDATE_PROFILE_INFO,
  UPDATE_PROFILE_INFO_SUCCESS,
  UPDATE_PROFILE_INFO_ERROR,
  RESET_STATE,
} from './constants';

export function resetState() {
  return {
    type: RESET_STATE,
  };
}

export function changeFirstName(firstName) {
  return {
    type: CHANGE_FIRST_NAME,
    firstName,
  };
}

export function changeLastName(lastName) {
  return {
    type: CHANGE_LAST_NAME,
    lastName,
  };
}

export function updateProfileInfo() {
  return {
    type: UPDATE_PROFILE_INFO,
  };
}

export function updateProfileInfoSuccess(userData) {
  return {
    type: UPDATE_PROFILE_INFO_SUCCESS,
    userData,
  };
}

export function updateProfileInfoError(err) {
  return {
    type: UPDATE_PROFILE_INFO_ERROR,
    err,
  };
}

export function removeProfilePicture() {
  return {
    type: REMOVE_PROFILE_PICTURE,
  };
}

export function removeProfilePictureSuccess() {
  return {
    type: REMOVE_PROFILE_PICTURE_SUCCESS,
  };
}

export function removeProfilePictureError() {
  return {
    type: REMOVE_PROFILE_PICTURE_ERROR,
  };
}
