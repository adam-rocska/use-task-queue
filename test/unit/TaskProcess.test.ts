import buildStubRecords from '!buildStubRecords';
import {isTaskProcess} from '#TaskProcess';
import {pseudoCancellable} from 'real-cancellable-promise';

describe('TaskProcess', ()=> {
  describe('isTaskProcess()', ()=> {
    it('should return true if the value is a TaskProcess', ()=> {
      expect(isTaskProcess({
        input: 123,
        task: pseudoCancellable(Promise.resolve(555)),
      })).toBe(true);
    });

    test.each([
      ...buildStubRecords({input: [1, true, false, null, undefined, {}, [], ()=> {}],}),
      ...buildStubRecords({task: [1, true, false, null, undefined, {}, [], ()=> {}],}),
      ...[{}]
    ])(
      'Should fail with invalid input: %p',
      wrongProcess => {
        expect(isTaskProcess(wrongProcess)).toBe(false);
      }
    );
  });
});