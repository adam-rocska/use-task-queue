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
    if (itemIndex === -1) {
      console.info('Item already removed.', lastItem);
    } else if (itemIndex < lastItemIndex) {
      console.info('Item shifted towards the front.', lastItem);
    } else if (itemIndex > lastItemIndex) {
      console.info('Item shifted towards the back.', lastItem);
    } else {
      console.info('Item still found in its original position.', lastItem);
    }
    return queue.filter((_, index) => index !== itemIndex);
  });
  return lastItem;
}
