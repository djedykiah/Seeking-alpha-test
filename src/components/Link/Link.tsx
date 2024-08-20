import { FC, ReactNode } from 'react';

type Props = {
  to: string;
  children: ReactNode;
};

export const Link: FC<Props> = ({ children, to }) => (
  <a href={to} target="_blank" style={{ color: '#2867db' }}>
    {children}
  </a>
);
