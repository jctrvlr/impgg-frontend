/**
 *
 * Tests for ChangePasswordModal
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { browserHistory } from 'react-router-dom';
import notistack from 'notistack';
import 'jest-dom/extend-expect'; // add some helpful assertions

import { ChangePasswordModal, mapDispatchToProps } from '../index';
import {
  changeLoginEmail,
  changePassword,
  authUser,
  updatePassword,
  resetState,
} from '../actions';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

jest.mock('notistack', () => ({
  useSnackbar: jest.fn(),
}));
const enqueueSnackbar = jest.fn();
jest
  .spyOn(notistack, 'useSnackbar')
  .mockImplementation(() => ({ enqueueSnackbar }));

describe('<ChangePasswordModal />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();

    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ChangePasswordModal
            dispatch={dispatch}
            userData={{}}
            authSuccess={false}
            loginError={false}
            loginEmail={false}
            password={false}
            loading={false}
            openModal
          />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('should have log in button disabled if email or password is an empty string', () => {
    const submitSpy = jest.fn();
    const text = 'Log In';

    const { getByText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ChangePasswordModal
            onChangeLoginEmail={() => {}}
            onChangePassword={() => {}}
            onSubmitForm={submitSpy}
            openModal
          />
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(getByText(text));
    expect(getByText(text)).toBeDisabled();
  });

  it('should not call onSubmitForm if email or password is an empty string', () => {
    const submitSpy = jest.fn();
    const text = 'Log In';

    const { getByText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ChangePasswordModal
            onChangeLoginEmail={() => {}}
            onChangePassword={() => {}}
            onSubmitForm={submitSpy}
            openModal
          />
        </IntlProvider>
      </Provider>,
    );
    fireEvent.click(getByText(text));
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('Should not call onSubmitForm if loginEmail is null', () => {
    const submitSpy = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ChangePasswordModal
            loginEmail=""
            onChangeLoginEmail={() => {}}
            onSubmitForm={submitSpy}
            openModal
          />
        </IntlProvider>
      </Provider>,
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('"Save password" button should not exist if authSuccess is not true', () => {
    const submitSpy = jest.fn();
    const text = 'Save password';

    const { queryByText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ChangePasswordModal
            authSuccess={false}
            onChangeLoginEmail={() => {}}
            onSubmitPasswordForm={submitSpy}
            openModal
          />
        </IntlProvider>
      </Provider>,
    );
    expect(queryByText(text)).toBeNull();
  });

  it('"Save password" button should exist if authSuccess is true', () => {
    const submitSpy = jest.fn();
    const text = 'Save password';

    const { queryByText } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ChangePasswordModal
            authSuccess
            onChangeLoginEmail={() => {}}
            onSubmitPasswordForm={submitSpy}
            openModal
          />
        </IntlProvider>
      </Provider>,
    );
    expect(queryByText(text)).not.toBeNull();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeLoginEmail', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeLoginEmail).toBeDefined();
      });

      it('should dispatch changeLoginEmail when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const email = 'login@email.com';
        result.onChangeLoginEmail({ target: { value: email } });
        expect(dispatch).toHaveBeenCalledWith(changeLoginEmail(email));
      });
    });

    describe('onChangePassword', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangePassword).toBeDefined();
      });

      it('should dispatch changePassword when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const password = 'Hunter2';
        result.onChangePassword({ target: { value: password } });
        expect(dispatch).toHaveBeenCalledWith(changePassword(password));
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch authUser when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();

        expect(dispatch).toHaveBeenCalledWith(authUser());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });

    describe('onSubmitPasswordForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitPasswordForm).toBeDefined();
      });

      it('should dispatch updatePassword when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitPasswordForm();

        expect(dispatch).toHaveBeenCalledWith(updatePassword());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitPasswordForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });

    describe('snackBarReset', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.snackBarReset).toBeDefined();
      });

      it('should dispatch changePassword when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.snackBarReset();
        expect(dispatch).toHaveBeenCalledWith(resetState());
      });
    });
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <ChangePasswordModal openModal />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
