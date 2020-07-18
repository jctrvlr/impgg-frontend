import produce from 'immer';
import contactPageReducer from '../reducer';
import {
  changeEmail,
  changeSubject,
  changeMessage,
  sendMessage,
  sendMessageSuccess,
  sendMessageError,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('contactPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      email: '',
      subject: '',
      message: '',
      error: false,
      messageSuccess: false,
      loading: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(contactPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeEmail action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.email = 'jcummings5@gmail.com';
    });

    expect(
      contactPageReducer(state, changeEmail('jcummings5@gmail.com')),
    ).toEqual(expectedResult);
  });

  it('should handle the changeSubject action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.subject = 'Subject right here';
    });

    expect(
      contactPageReducer(state, changeSubject('Subject right here')),
    ).toEqual(expectedResult);
  });

  it('should handle the changeMessage action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.message = 'Message right here';
    });

    expect(
      contactPageReducer(state, changeMessage('Message right here')),
    ).toEqual(expectedResult);
  });

  it('should handle the sendMessage action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.messageSuccess = false;
      draft.error = false;
      draft.loading = true;
    });

    expect(contactPageReducer(state, sendMessage())).toEqual(expectedResult);
  });

  it('should handle the sendMessageSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.messageSuccess = true;
      draft.error = false;
      draft.loading = false;
    });

    expect(contactPageReducer(state, sendMessageSuccess())).toEqual(
      expectedResult,
    );
  });

  it('should handle the sendMessageSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.messageSuccess = false;
      draft.error = 'error';
      draft.loading = false;
    });

    expect(contactPageReducer(state, sendMessageError('error'))).toEqual(
      expectedResult,
    );
  });
});
