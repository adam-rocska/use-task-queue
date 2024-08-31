import buildStubRecords from '!buildStubRecords';
import {isTaskOutput} from '!src/TaskOutput';

describe('TaskProcess', () => {
  describe('isTaskProcess()', () => {
    it('should return true if the value is a TaskProcess', () => {
      [
        ...buildStubRecords({
          input: [1, true, false, null, undefined, {}, [], () => {}],
          output: [1, true, false, null, undefined, {}, [], () => {}],
        }),
      ].forEach(shouldWork => expect(isTaskOutput(shouldWork)).toBe(true));
    });

    it('Should fail with invalid input: %p', () =>
      [
        ...buildStubRecords({
          input: [1, true, false, null, undefined, {}, [], () => {}],
        }),
        ...buildStubRecords({
          output: [1, true, false, null, undefined, {}, [], () => {}],
        }),
        ...[{}],
      ].forEach(wrongProcess =>
        expect(isTaskOutput(wrongProcess)).toBe(false)
      ));
  });
});
