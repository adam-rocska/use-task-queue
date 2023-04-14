import {Dispatch, SetStateAction} from 'react';

export default function flushFrom<V>(
  set: Dispatch<SetStateAction<V[]>>,
  itemsToFlush?: V[]
) {
  if (itemsToFlush?.length === 0) return;
  set(queue => {
    if (itemsToFlush === undefined) return [];
    const items = new Set(itemsToFlush);
    return queue.filter(v => !items.delete(v));
  });
}
