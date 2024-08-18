import { ReactNode } from 'react';

import { Loader } from '../Loader';

import styles from './Card.module.css';
import { Column, Table } from './Table';

type Props<T> = {
  title: string;
  items: T[];
  isError: boolean;
  isLoading: boolean;
  layout: 'list' | 'table';
  columns?: Column[];
  footer?: ReactNode;
};

export const Card = <
  T extends {
    [ket: string]: any;
  },
>({
  title,
  items,
  isLoading,
  isError,
  layout,
  columns,
  footer,
}: Props<T>) => {
  const renderBody = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (isError) {
      return (
        <div className={styles.error}>
          Unable to fetch data. Try again in a few moments.
        </div>
      );
    }

    return (
      <>
        {layout === 'table' && columns?.length && (
          <Table<T> data={items} columns={columns} />
        )}
      </>
    );
  };

  return (
    <section className={styles.container}>
      <header>
        <h3 className={styles.title}>{title}</h3>
      </header>
      <main className={styles.body}>{renderBody()}</main>
      {footer && <footer className={styles.footer}>{footer}</footer>}
    </section>
  );
};
