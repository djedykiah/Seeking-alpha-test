import { ReactNode } from 'react';

import { Loader } from '../Loader';

import styles from './Card.module.css';

type Props = {
  title: string;
  isLoading: boolean;
  minHeight: number;
  children: ReactNode;
};

export const Card = ({ title, isLoading, minHeight, children }: Props) => (
  <section
    className={styles.container}
    style={{
      minHeight,
    }}
  >
    <header>
      <h3 className={styles.title}>{title}</h3>
    </header>
    <main className={styles.body}>{isLoading ? <Loader /> : children}</main>
  </section>
);
