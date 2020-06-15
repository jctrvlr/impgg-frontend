import { validateEmail, changeEmail, changePassword } from '../actions';
import { CHANGE_EMAIL, CHANGE_PASSWORD, EMAIL_VALIDATION } from '../constants';

describe('SigninPage actions', () => {
  describe('EMAIL_VALIDATION Action', () => {
    it('returns type EMAIL_VALIDATION and false if email is valid', () => {
      const expected = {
        type: EMAIL_VALIDATION,
        emailValidation: false,
      };
      expect(validateEmail('jcummings5@gmail.com')).toEqual(expected);
    });

    it('returns type EMAIL_VALIDATION and message if email is invalid', () => {
      const expected = {
        type: EMAIL_VALIDATION,
        emailValidation: 'Enter a valid email',
      };
      expect(validateEmail('invalidemail.com')).toEqual(expected);
    });
  });

  describe('changeEmail Action', () => {
    it('has a type of CHANGE_EMAIL and passes email', () => {
      const expected = {
        type: CHANGE_EMAIL,
        email: 'jcummings5@gmail.com',
      };
      expect(changeEmail('jcummings5@gmail.com')).toEqual(expected);
    });
  });

  describe('changePassword Action', () => {
    it('has a type of CHANGE_PASSWORD and passes password', () => {
      const expected = {
        type: CHANGE_PASSWORD,
        password: 'hunter1',
      };
      expect(changePassword('hunter1')).toEqual(expected);
    });
  });
});
