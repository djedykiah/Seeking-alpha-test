import React, { FC } from 'react';

import { Cell } from './Cell';
import { Row } from './Row';
import { Column } from './typings';

type Props = {
  data: any;
  columns: Column[];
};

export const Table: FC<Props> = ({ data, columns }) => {
  console.log(columns);
  console.log(data);

  return (
    <div
      style={{
        display: 'grid',
        rowGap: '15px',
      }}
    >
      {data.map((item) => (
        <Row>
          {columns.map(({ field, align }) => (
            <Cell align={align}>{item[field]}</Cell>
          ))}
        </Row>
      ))}
    </div>
  );
};
