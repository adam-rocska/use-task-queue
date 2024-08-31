import {Dispatch, SetStateAction} from 'react';

export default function popFrom<V>(
  set: Dispatch<SetStateAction<V[]>>,
  queue: V[]
): V | undefined {
  if (queue.length === 0) return undefined;
  const lastItemIndex = queue.length - 1;
  const lastItem = queue[lastItemIndex];
  set(queue => {
    const itemIndex = queue.findIndex(v => v === lastItem);
    return queue.filter((_, index) => index !== itemIndex);
  });
  return lastItem;
}
