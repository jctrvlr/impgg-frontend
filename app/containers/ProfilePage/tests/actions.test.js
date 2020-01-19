import { changeFirstName, changeLastName } from '../actions';
import { CHANGE_FIRST_NAME, CHANGE_LAST_NAME } from '../constants';

describe('ProfilePage actions', () => {
  describe('changeFirstName', () => {
    it('has a type of CHANGE_FIRST_NAME', () => {
      const expected = {
        type: CHANGE_FIRST_NAME,
      };
      expect(changeFirstName()).toEqual(expected);
    });
  });
  describe('changeLastName', () => {
    it('has a type of CHANGE_LAST_NAME', () => {
      const expected = {
        type: CHANGE_LAST_NAME,
      };
      expect(changeLastName()).toEqual(expected);
    });
  });
});
