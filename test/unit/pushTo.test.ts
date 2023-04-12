import pushTo from '#pushTo';

describe('pushTo', () => {
  it('short exits if the value is empty', () => {
    const set = jest.fn();
    const value: number[] = [];
    expect(pushTo(set, value)).toEqual(value);
    expect(set).not.toHaveBeenCalled();
  });

  it('pushes the value to the setter.', () => {
    const set = jest.fn();
    const value = [1, 2, 3];
    expect(pushTo(set, value)).toEqual(value);
    const deferredPush = set.mock.calls[0][0];
    expect(deferredPush([1, 2])).toEqual([1, 2, 1, 2, 3]);
  });
});
