import { FC, ReactNode } from 'react';

import styles from './List.module.css';

type Item = {
  title: string;
  value: ReactNode;
};

type Props = {
  items: Item[];
};

export const List: FC<Props> = ({ items }) => (
  <ul className={styles.list}>
    {items.map(({ title, value }) => (
      <li key={title} className={styles.item}>
        <span>{title}</span>
        <span>{value}</span>
      </li>
    ))}
  </ul>
);
