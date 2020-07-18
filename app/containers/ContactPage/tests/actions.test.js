import {
  changeEmail,
  changeMessage,
  changeSubject,
  sendMessage,
  sendMessageSuccess,
  sendMessageError,
} from '../actions';
import {
  CHANGE_EMAIL,
  CHANGE_SUBJECT,
  CHANGE_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
} from '../constants';

describe('ContactPage actions', () => {
  describe('changeEmail Action', () => {
    it('has a type of CHANGE_EMAIL and email', () => {
      const expected = {
        type: CHANGE_EMAIL,
        email: 'jcummings5@gmail.com',
      };
      expect(changeEmail('jcummings5@gmail.com')).toEqual(expected);
    });
  });

  describe('changeMessage Action', () => {
    it('has a type of CHANGE_MESSAGE and message', () => {
      const expected = {
        type: CHANGE_MESSAGE,
        message: 'I am writing a message here',
      };
      expect(changeMessage('I am writing a message here')).toEqual(expected);
    });
  });

  describe('changeSubject Action', () => {
    it('has a type of CHANGE_SUBJECT and subject', () => {
      const expected = {
        type: CHANGE_SUBJECT,
        subject: 'Subject here bro',
      };
      expect(changeSubject('Subject here bro')).toEqual(expected);
    });
  });

  describe('sendMessage Action', () => {
    it('has a type of SEND_MESSAGE', () => {
      const expected = {
        type: SEND_MESSAGE,
      };
      expect(sendMessage()).toEqual(expected);
    });
  });

  describe('sendMessageSuccess Action', () => {
    it('has a type of SEND_MESSAGE_SUCCESS', () => {
      const expected = {
        type: SEND_MESSAGE_SUCCESS,
      };
      expect(sendMessageSuccess()).toEqual(expected);
    });
  });

  describe('sendMessageError Action', () => {
    it('has a type of SEND_MESSAGE_ERROR and error', () => {
      const expected = {
        type: SEND_MESSAGE_ERROR,
        error: 'error',
      };
      expect(sendMessageError('error')).toEqual(expected);
    });
  });
});
