import { FC, ReactNode } from 'react';

import styles from './List.module.css';

type Props = {
  items: ReactNode[][];
};

export const List: FC<Props> = ({ items }) => (
  <ul className={styles.list}>
    {items.map((item) => (
      <li className={styles.item}>
        {item.map((value) => (
          <span>{value}</span>
        ))}
      </li>
    ))}
  </ul>
);
