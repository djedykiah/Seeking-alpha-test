import { ReactNode } from 'react';

import { Link } from '../Link';

import { Cell } from './Cell';
import { Row } from './Row';

import styles from './Table.module.css';

export type Column<T> = {
  field: keyof T;
  align: 'left' | 'center' | 'right';
  title?: string;
  href?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
};

export const Table = <T extends Record<PropertyKey, unknown>>({
  data,
  columns,
}: Props<T>) => {
  const shouldRenderHeading = columns.some(({ title }) => title);

  return (
    <div className={styles.container}>
      {shouldRenderHeading && (
        <div className={styles.heading}>
          <Row length={columns.length}>
            {columns.map(({ title, align }, index) => (
              <Cell key={title ?? index} align={align}>
                {title}
              </Cell>
            ))}
          </Row>
        </div>
      )}
      {data.map((item, index) => (
        <Row key={index} length={columns.length}>
          {columns.map(({ field, align, href }) => (
            <Cell key={field as string} align={align}>
              {href ? (
                <Link to={href}>{item[field] as ReactNode}</Link>
              ) : (
                (item[field] as ReactNode)
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </div>
  );
};
