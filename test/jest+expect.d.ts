import {Expectations} from './expect.toBeInState';

declare global {
  namespace jest {
    interface Expect {
      toBeInState<I, O>(expectations: Expectations<I, O>): void;
    }
    interface Matchers<R> {
      toBeInState<I, O>(expectations: Expectations<I, O>): R;
    }
  }
}

export default undefined;
