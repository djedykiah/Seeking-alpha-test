import { FC, ReactNode } from 'react';

type Props = {
  length: number;
  children: ReactNode;
};

export const Row: FC<Props> = ({ length, children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${length}, 1fr)`,
    }}
  >
    {children}
  </div>
);
