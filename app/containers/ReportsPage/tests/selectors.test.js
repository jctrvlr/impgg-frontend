import {
  makeSelectClickCount,
  makeSelectClickLinkFilter,
  makeSelectUserLinks,
  makeSelectGetReport,
} from '../selectors';

describe('Selectors', () => {
  describe('makeSelectClickCount', () => {
    it('should select the clickCount', () => {
      const router = {
        clickCount: 100,
      };
      const mockedState = {
        router,
      };
      expect(makeSelectClickCount()(mockedState)).toEqual(router.clickCount);
    });
  });

  describe('makeSelectClickLinkFilter', () => {
    it('should select the clickLinkFilter', () => {
      const router = {
        clickLinkFilter: [],
      };
      const mockedState = {
        router,
      };
      expect(makeSelectClickLinkFilter()(mockedState)).toEqual(
        router.clickLinkFilter,
      );
    });
  });

  describe('makeSelectUserLinks', () => {
    it('should select the userLinks', () => {
      const router = {
        userLinks: [],
      };
      const mockedState = {
        router,
      };
      expect(makeSelectUserLinks()(mockedState)).toEqual(router.userLinks);
    });
  });

  describe('makeSelectGetReport', () => {
    it('should select the getReport', () => {
      const router = {
        getReport: false,
      };
      const mockedState = {
        router,
      };
      expect(makeSelectGetReport()(mockedState)).toEqual(router.getReport);
    });
  });
});
