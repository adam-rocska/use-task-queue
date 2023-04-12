import buildStubRecords from '!buildStubRecords';
import {isTaskOutput} from '#TaskOutput';
import {pseudoCancellable} from 'real-cancellable-promise';

describe('TaskProcess', ()=> {
  describe('isTaskProcess()', ()=> {
    it('should return true if the value is a TaskProcess', ()=> {
      expect(isTaskOutput({
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
      wrongProcess => expect(isTaskOutput(wrongProcess)).toBe(false)
    );
  });
});