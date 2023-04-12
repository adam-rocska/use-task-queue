import buildStubRecords from '!buildStubRecords';
import {isTaskOutput} from '#TaskOutput';

describe('TaskProcess', () => {
  describe('isTaskProcess()', () => {
    test.each([
      ...buildStubRecords({
        input: [1, true, false, null, undefined, {}, [], () => {}],
        output: [1, true, false, null, undefined, {}, [], () => {}],
      }),
    ])('should return true if the value is a TaskProcess', shouldWork => {
      console.log(shouldWork);
      expect(isTaskOutput(shouldWork)).toBe(true);
    });

    test.each([
      ...buildStubRecords({
        input: [1, true, false, null, undefined, {}, [], () => {}],
      }),
      ...buildStubRecords({
        output: [1, true, false, null, undefined, {}, [], () => {}],
      }),
      ...[{}],
    ])('Should fail with invalid input: %p', wrongProcess =>
      expect(isTaskOutput(wrongProcess)).toBe(false)
    );
  });
});
