import React, { FC, ReactNode } from 'react';

type Props = {
  align: 'left' | 'center' | 'right';
  children: ReactNode;
};
export const Cell: FC<Props> = ({ align, children }) => (
  <div
    style={{
      textAlign: align,
    }}
  >
    {children}
  </div>
);
