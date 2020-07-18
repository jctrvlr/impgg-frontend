import {
  makeSelectEmail,
  makeSelectSubject,
  makeSelectMessage,
  makeSelectError,
  makeSelectMessageSuccess,
  makeSelectLoading,
} from 'containers/ContactPage/selectors';

describe('makeSelectEmail', () => {
  const emailSelector = makeSelectEmail();

  it('should select the email', () => {
    const email = 'jcummings5@gmail.com';
    const mockedState = {
      contactPage: {
        email,
      },
    };
    expect(emailSelector(mockedState)).toEqual(email);
  });
});

describe('makeSelectSubject', () => {
  const subjectSelector = makeSelectSubject();

  it('should select the subject', () => {
    const subject = 'Subject here';
    const mockedState = {
      contactPage: {
        subject,
      },
    };
    expect(subjectSelector(mockedState)).toEqual(subject);
  });
});

describe('makeSelectMessage', () => {
  const messageSelector = makeSelectMessage();

  it('should select the message', () => {
    const message = 'Message here';
    const mockedState = {
      contactPage: {
        message,
      },
    };
    expect(messageSelector(mockedState)).toEqual(message);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();

  it('should select the error', () => {
    const error = 'error';
    const mockedState = {
      contactPage: {
        error,
      },
    };
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectMessageSuccess', () => {
  const messageSuccessSelector = makeSelectMessageSuccess();

  it('should select the messageSuccess', () => {
    const messageSuccess = false;
    const mockedState = {
      contactPage: {
        messageSuccess,
      },
    };
    expect(messageSuccessSelector(mockedState)).toEqual(messageSuccess);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();

  it('should select the loading', () => {
    const loading = false;
    const mockedState = {
      contactPage: {
        loading,
      },
    };
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});
