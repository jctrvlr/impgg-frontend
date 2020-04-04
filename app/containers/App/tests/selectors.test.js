import {
  selectGlobal,
  makeSelectLocation,
  makeSelectLoading,
  makeSelectLoggedIn,
  makeSelectError,
  makeSelectUserData,
} from 'containers/App/selectors';
describe('App wide Global Selectors', () => {
  describe('selectGlobal', () => {
    it('should select the global state', () => {
      const globalState = {
        userData: {},
      };
      const mockedState = {
        global: globalState,
      };
      expect(selectGlobal(mockedState)).toEqual(globalState);
    });
  });

  describe('makeSelectLocation', () => {
    it('should select the location', () => {
      const router = {
        location: { pathname: '/foo' },
      };
      const mockedState = {
        router,
      };
      expect(makeSelectLocation()(mockedState)).toEqual(router.location);
    });
  });

  describe('makeSelectLoading', () => {
    it('should select loading', () => {
      const global = {
        loading: false,
      };
      const mockedState = {
        global,
      };
      expect(makeSelectLoading()(mockedState)).toEqual(global.loading);
    });
  });

  describe('makeSelectLoggedIn', () => {
    it('should select loggedIn', () => {
      const global = {
        loggedIn: false,
      };
      const mockedState = {
        global,
      };
      expect(makeSelectLoggedIn()(mockedState)).toEqual(global.loggedIn);
    });
  });

  describe('makeSelectError', () => {
    it('should select error', () => {
      const global = {
        error: false,
      };
      const mockedState = {
        global,
      };
      expect(makeSelectError()(mockedState)).toEqual(global.error);
    });
  });

  describe('makeSelectUserData', () => {
    it('should select userData', () => {
      const global = {
        userData: {
          user: {
            firstName: 'steve',
            lastName: 'aoki',
          },
        },
      };
      const mockedState = {
        global,
      };
      expect(makeSelectUserData()(mockedState)).toEqual(global.userData);
    });
  });
});
