import { changeEmail } from '../actions';
import { CHANGE_EMAIL } from '../constants';

describe('SecurityPage actions', () => {
  describe('changeEmail', () => {
    it('has a type of CHANGE_EMAIL', () => {
      const expected = {
        type: CHANGE_EMAIL,
      };
      expect(changeEmail()).toEqual(expected);
    });
  });
});
