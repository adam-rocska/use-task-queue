import {Dispatch, SetStateAction} from 'react';

export default function removeFrom<V>(
  set: Dispatch<SetStateAction<V[]>>,
  value: V
) {
  set(queue => {
    const index = queue.findIndex(v => v === value);
    if (index === -1) return queue;
    return queue.filter((_, i) => i !== index);
  });
}
