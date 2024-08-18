import React, { FC, useMemo } from 'react';

import { Cell } from './Cell';
import { Row } from './Row';
import styles from './Table.module.css';
import { Column } from './typings';

type Props<T> = {
  data: T[];
  columns: Column[];
};

export const Table = <
  T extends {
    [key: string]: any;
  },
>({
  data,
  columns,
}: Props<T>) => {
  const shouldRenderHeading = useMemo(
    () => columns.some(({ title }) => title),
    [columns],
  );

  return (
    <div className={styles.container}>
      {shouldRenderHeading && (
        <div className={styles.heading}>
          <Row length={columns.length}>
            {columns.map(({ title, align }) => (
              <Cell align={align}>{title}</Cell>
            ))}
          </Row>
        </div>
      )}
      {data.map((item) => (
        <Row length={columns.length}>
          {columns.map(({ field, align }) => (
            <Cell align={align}>{item[field]}</Cell>
          ))}
        </Row>
      ))}
    </div>
  );
};
