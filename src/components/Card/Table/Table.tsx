import { useMemo } from 'react';

import { Link } from '../../Link';

import { Cell } from './Cell';
import { Row } from './Row';
import styles from './Table.module.css';

export type Column = {
  field: string;
  align: 'left' | 'center' | 'right';
  title?: string;
  href?: string;
};

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
          {columns.map(({ field, align, href }) => (
            <Cell key={field} align={align}>
              {href ? <Link to={href}>{item[field]}</Link> : item[field]}
            </Cell>
          ))}
        </Row>
      ))}
    </div>
  );
};
