import React from 'react';

export const Row = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${children.length}, 1fr)`,
    }}
  >
    {children}
  </div>
);
