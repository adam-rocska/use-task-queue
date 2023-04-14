import flushFrom from '#flushFrom';

describe('flushFrom', () => {
  it("Shouldn't resort to set if the items to remove is empty.", () => {
    const set = jest.fn();
    flushFrom(set, []);
    expect(set).not.toHaveBeenCalled();
  });

  it('Should remove the items from the set.', () => {
    const set = jest.fn();
    flushFrom(set, [1, 2, 3]);
    const setCall = set.mock.calls[0][0];
    expect(setCall([1, 2, 3, 4, 5])).toEqual([4, 5]);
    expect(setCall([3, 4, 5, 1, 2])).toEqual([4, 5]);
    expect(setCall([1, 3, 4, 5, 2])).toEqual([4, 5]);

    expect(setCall([1, 2, 3, 4, 5, 1, 2, 3])).toEqual([4, 5, 1, 2, 3]);
    expect(setCall([3, 4, 5, 1, 2, 1, 2, 3])).toEqual([4, 5, 1, 2, 3]);
    expect(setCall([1, 3, 4, 5, 2, 1, 2, 3])).toEqual([4, 5, 1, 2, 3]);
  });

  it('Should remove all items from the set.', () => {
    const set = jest.fn();
    flushFrom(set);
    const setCall = set.mock.calls[0][0];
    expect(setCall([1, 2, 3, 4, 5])).toEqual([]);
    expect(setCall([3, 4, 5, 1, 2])).toEqual([]);
    expect(setCall([1, 3, 4, 5, 2])).toEqual([]);
    expect(setCall([1, 2, 3, 4, 5, 1, 2, 3])).toEqual([]);
    expect(setCall([3, 4, 5, 1, 2, 1, 2, 3])).toEqual([]);
    expect(setCall([1, 3, 4, 5, 2, 1, 2, 3])).toEqual([]);
  });
});
