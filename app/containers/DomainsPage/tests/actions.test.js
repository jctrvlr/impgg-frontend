import { changeSelectedDomain } from '../actions';
import { CHANGE_SELECTED_DOMAIN } from '../constants';

describe('DomainsPage actions', () => {
  describe('Default Action', () => {
    it('should return type of CHANGE_SELECTED_DOMAIN and pass selectedDomain', () => {
      const fixture = ['domain'];
      const expected = {
        type: CHANGE_SELECTED_DOMAIN,
        selectedDomain: fixture,
      };
      expect(changeSelectedDomain(fixture)).toEqual(expected);
    });
  });
});
