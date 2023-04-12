import consistencyGuard from '#consistencyGuard';

describe('consistencyGuard', () => {
  beforeEach(() => jest.resetModules());
  it('should pass silently if the store is empty.', () => {
    consistencyGuard({name: 'test'});
  });
  it('should pass silently if the store has the same descriptor.', () => {
    consistencyGuard({name: 'test'});
    consistencyGuard({name: 'test'});
  });
});
