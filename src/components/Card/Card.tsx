import { ReactNode } from 'react';

import styles from './Card.module.css';

type Props = {
  title: string;
  minHeight: number;
  children: ReactNode;
};

export const Card = ({ title, minHeight, children }: Props) => (
  <section
    className={styles.container}
    style={{
      minHeight,
    }}
  >
    <header>
      <h3 className={styles.title}>{title}</h3>
    </header>
    <main className={styles.body}>{children}</main>
  </section>
);
