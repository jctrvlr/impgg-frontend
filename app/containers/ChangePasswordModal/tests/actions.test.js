import { authUser } from '../actions';
import { AUTH_USER } from '../constants';

describe('ChangePasswordModal actions', () => {
  describe('authUser', () => {
    it('has a type of AUTH_USER', () => {
      const expected = {
        type: AUTH_USER,
      };
      expect(authUser()).toEqual(expected);
    });
  });
});
