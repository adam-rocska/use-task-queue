import popFrom from '#popFrom';

describe('popFrom', () => {
  it('should return undefined if the queue is empty', () => {
    const set = jest.fn();
    const queue: number[] = [];
    const result = popFrom(set, queue);
    expect(result).toBeUndefined();
    expect(set).not.toHaveBeenCalled();
  });
  it('should return the last item in the queue', () => {
    const set = jest.fn();
    const queue = [1, 2, 3];
    const result = popFrom(set, queue);
    expect(result).toBe(3);
  });
  it('should remove the last item from the queue', () => {
    const set = jest.fn();
    const queue = [1, 2, 3];
    popFrom(set, queue);
    const deferredCall = set.mock.calls[0][0];
    expect(deferredCall(queue)).toEqual([1, 2]);
  });
  it('should drop the returned item from the queue even with deferral in place', () => {
    const set = jest.fn();
    const queue = [1, 2, 3];
    popFrom(set, queue);
    queue.push(4, 5, 3, 3);
    const deferredCall = set.mock.calls[0][0];
    const result = deferredCall(queue);
    expect(result).toEqual([1, 2, 4, 5, 3, 3]);
  });
});
