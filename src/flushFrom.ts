import {Dispatch, SetStateAction} from 'react';

export default function flushFrom<V>(
  set: Dispatch<SetStateAction<V[]>>,
  queue: V[],
  itemsToFlush?: V[]
): V[] {
  if (itemsToFlush === undefined) itemsToFlush = queue;
  if (itemsToFlush?.length === 0) return itemsToFlush;
  set(queue => {
    const items = new Set(itemsToFlush);
    return queue.filter(v => !items.delete(v));
  });
  return itemsToFlush;
}
