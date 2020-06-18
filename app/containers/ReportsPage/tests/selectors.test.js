import { makeSelectClickCount } from '../selectors';

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
