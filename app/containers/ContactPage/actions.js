/*
 *
 * ContactPage actions
 *
 */

import {
  CHANGE_EMAIL,
  CHANGE_SUBJECT,
  CHANGE_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from './constants';

export function changeEmail(email) {
  return {
    type: CHANGE_EMAIL,
    email,
  };
}

export function changeSubject(subject) {
  return {
    type: CHANGE_SUBJECT,
    subject,
  };
}

export function changeMessage(message) {
  return {
    type: CHANGE_MESSAGE,
    message,
  };
}

export function sendMessage() {
  return {
    type: SEND_MESSAGE,
  };
}

export function sendMessageSuccess() {
  return {
    type: SEND_MESSAGE_SUCCESS,
  };
}

export function sendMessageError(error) {
  return {
    type: SEND_MESSAGE_ERROR,
    error,
  };
}
