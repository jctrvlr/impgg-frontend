import { validateEmail, changeEmail, changePassword } from '../actions';
import { CHANGE_EMAIL, CHANGE_PASSWORD, EMAIL_VALIDATION } from '../constants';

describe('SigninPage actions', () => {
  describe('validateEmail Action', () => {
    it('should return type of EMAIL_VALIDATION and pass emailValidation false with valid email', () => {
      const fixture = 'email@email.com';
      const result = false;

      const expected = {
        type: EMAIL_VALIDATION,
        emailValidation: result,
      };

      expect(validateEmail(fixture)).toEqual(expected);
    });

    it('should pass emailValidation message with invalid email', () => {
      const fixture = 'notvalid';
      const result = 'Enter a valid email';

      const expected = {
        type: EMAIL_VALIDATION,
        emailValidation: result,
      };

      expect(validateEmail(fixture)).toEqual(expected);
    });
  });

  describe('changeEmail Action', () => {
    it('should return type of CHANGE_EMAIL and pass email', () => {
      const fixture = 'adam@imp.gg';

      const expected = {
        type: CHANGE_EMAIL,
        email: fixture,
      };

      expect(changeEmail(fixture)).toEqual(expected);
    });
  });

  describe('changePassword Action', () => {
    it('should return type of CHANGE_PASSWORD and pass password', () => {
      const fixture = 'Hunter2';

      const expected = {
        type: CHANGE_PASSWORD,
        password: fixture,
      };

      expect(changePassword(fixture)).toEqual(expected);
    });
  });
});
