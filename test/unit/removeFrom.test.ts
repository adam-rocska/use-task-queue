import removeFrom from '#removeFrom';

describe('removeFrom', () => {
  it('should should resolve unaltered if item to remove is not present.', () => {
    const set = jest.fn();
    const value = 'foo';
    removeFrom(set, value);
    expect(set).toHaveBeenCalledWith(expect.any(Function));
    expect(set.mock.calls[0][0](['bar'])).toEqual(['bar']);
  });

  it('should remove the first matching item from the queue', () => {
    const set = jest.fn();
    const value = 'foo';
    removeFrom(set, value);
    expect(set).toHaveBeenCalledWith(expect.any(Function));
    expect(set.mock.calls[0][0](['foo', 'bar'])).toEqual(['bar']);
    expect(set.mock.calls[0][0](['bar', 'foo'])).toEqual(['bar']);
    expect(set.mock.calls[0][0](['foo', 'foo', 'bar'])).toEqual(['foo', 'bar']);
    expect(set.mock.calls[0][0](['bar', 'foo', 'foo'])).toEqual(['bar', 'foo']);
  });
});
