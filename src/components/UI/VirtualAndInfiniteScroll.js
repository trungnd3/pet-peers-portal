import React from 'react';
import VirtualScrollChild from './VirtualScrollChild';
import InfiniteScroll from './InfiniteScroll';

/**
 * A wrapper component for implementing virtual and
 * infinite scrolling.
 */
function VirtualAndInfiniteScroll({ listItems, height, lastRowHandler, type }) {
  const VirtualScrollChildren = listItems.map((listItem) => (
    <VirtualScrollChild height={height} children={listItem} type={type} />
  ));

  return (
    <InfiniteScroll
      listItems={VirtualScrollChildren}
      lastRowHandler={lastRowHandler}
    />
  );
}

export default VirtualAndInfiniteScroll;
