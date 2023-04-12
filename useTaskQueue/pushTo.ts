import {Dispatch, SetStateAction} from 'react';

export default function pushTo<V>(
  set: Dispatch<SetStateAction<V[]>>,
  value: V[]
) {
  if (value.length === 0) return value;
  set(v => [...v, ...value]);
  return value;
}
