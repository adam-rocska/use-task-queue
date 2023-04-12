import buildStubRecords from '!buildStubRecords';
import {isTaskProcess} from '#TaskProcess';
import {pseudoCancellable} from 'real-cancellable-promise';

describe('TaskProcess', () => {
  describe('isTaskProcess()', () => {
    it('should return true if the value is a TaskProcess', () => {
      buildStubRecords({
        input: [123],
        task: [
          pseudoCancellable(Promise.resolve([555])),
          new Promise(resolve => resolve([555])),
        ],
      }).forEach(process => expect(isTaskProcess(process)).toBe(true));
    });

    it('Should fail with invalid input.', () => {
      [
        ...buildStubRecords({
          input: [1, true, false, null, undefined, {}, [], () => {}],
        }),
        ...buildStubRecords({
          task: [1, true, false, null, undefined, {}, [], () => {}],
        }),
        ...[{}],
      ].forEach(wrongProcess =>
        expect(isTaskProcess(wrongProcess)).toBe(false)
      );
    });
  });
});
