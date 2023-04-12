import {Dispatch, SetStateAction} from 'react';

export default function removeFrom<V>(
  set: Dispatch<SetStateAction<V[]>>,
  value: V
) {
  set(queue => {
    const index = queue.findIndex(v => v === value);
    if (index === -1) {
      console.info('Item already removed.', value);
      return queue;
    }
    return queue.filter((_, i) => i !== index);
  });
}
