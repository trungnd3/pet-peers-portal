import React from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * A wrapper component for children of
 * VirtualScroll. Computes inline style and
 * handles whether to display props.children.
 */
function VirtualScrollChild({ height, children, type }) {
  const [ref, inView] = useInView();
  const style = {
    height: `${height}px`,
    overflow: 'hidden',
  };
  if (type === 'tr') {
    return (
      <tr style={style} ref={ref}>
        {inView ? children : null}
      </tr>
    );
  }
  return (
    <div style={style} ref={ref}>
      {inView ? children : null}
    </div>
  );
}

export default VirtualScrollChild;
