import React, { FC } from 'react';

import { Table } from './Table/Table';
import styles from './Card.module.css';

type Props<T> = {
  title: string;
  items: T[];
  isPermitted: boolean;
  isError: boolean;
  isLoading: boolean;
  columns: any[];
  layout: 'list' | 'table';
  link?: {
    label: string;
    url: string;
  };
};

export const Card = <T,>({
  title,
  items,
  isPermitted,
  isLoading,
  layout,
  link,
  columns,
}: Props<T>) => {
  console.log(items);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.body}>
            {layout === 'table' && columns.length && (
              <Table data={items} columns={columns} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
