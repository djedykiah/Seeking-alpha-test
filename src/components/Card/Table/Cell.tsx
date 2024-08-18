import React, { FC, ReactNode } from 'react';

type Props = {
  align: 'left' | 'center' | 'right';
  children: ReactNode;
};
export const Cell: FC<Props> = ({ align, children }) => {
  console.log('c', children);

  return (
    <div
      style={{
        textAlign: align,
      }}
    >
      {children}
    </div>
  );
};
