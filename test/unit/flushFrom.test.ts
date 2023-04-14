import flushFrom from '#flushFrom';

describe('flushFrom', () => {
  let setStateDispatch = jest.fn();
  beforeEach(() => (setStateDispatch = jest.fn()));

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

  it("Shouldn't resort to set if the items to remove is empty.", () => {
    const result = flushFrom(setStateDispatch, []);
    expect(setStateDispatch).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });
  it("Shouldn't resort to set if the queue is empty.", () => {
    const result = flushFrom(setStateDispatch, []);
    expect(setStateDispatch).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });
  it("Shouldn't resort to set if both the queue and the items to remove are empty.", () => {
    const result = flushFrom(setStateDispatch, [], []);
    expect(setStateDispatch).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  describe('in sync', () => {
    it('should flush and return all.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([1, 2, 3]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 3])).toEqual([]);
    });
    it('should flush and return from head.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3], [1, 2]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([1, 2]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 3])).toEqual([3]);
    });
    it('should flush and return from tail.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3], [2, 3]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([2, 3]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 3])).toEqual([1]);
    });
    it('should flush and return from in-between.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3], [2]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([2]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 3])).toEqual([1, 3]);
    });
    it('should flush and return from scattered.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3, 4, 5], [2, 4]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([2, 4]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 3, 4, 5])).toEqual([
        1, 3, 5,
      ]);
    });
  });

  describe('out of sync', () => {
    it('should flush and return all.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([1, 2, 3]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 3, 4, 5])).toEqual([
        4, 5,
      ]);
    });
    it('should flush and return from head.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3], [1, 2]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([1, 2]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 1, 2, 3])).toEqual([
        1, 2, 3,
      ]);
    });
    it('should flush and return from tail.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3], [2, 3]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([2, 3]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 3, 1, 2])).toEqual([
        1, 1, 2,
      ]);
    });
    it('should flush and return from in-between.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3, 4], [2, 3]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([2, 3]);
      expect(setStateDispatch.mock.calls[0][0]([1, 2, 1, 2, 3])).toEqual([
        1, 1, 2,
      ]);
    });
    it('should flush and return from scattered.', () => {
      const result = flushFrom(setStateDispatch, [1, 2, 3, 4, 5], [2, 4]);
      expect(setStateDispatch).toHaveBeenCalled();
      expect(result).toEqual([2, 4]);
      expect(
        setStateDispatch.mock.calls[0][0]([1, 2, 3, 4, 5, 1, 2, 3])
      ).toEqual([1, 3, 5, 1, 2, 3]);
    });
  });
});
