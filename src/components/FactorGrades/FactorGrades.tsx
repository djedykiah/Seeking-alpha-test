import { useMemo } from 'react';

import { useFactorGradesQuery } from '../../api';
import { Card, Column } from '../Card';

import { mapResponse } from './mapResponse';

const columns: Column[] = [
  {
    field: 'title',
    align: 'left',
    href: '/',
  },
  {
    field: '0',
    align: 'center',
    title: 'Now',
  },
  {
    field: '3',
    align: 'center',
    title: '3M ago',
  },
  {
    field: '6',
    align: 'center',
    title: '6M ago',
  },
];

type Item = {
  title: string;
  '0': string;
  '3': string;
  '6': string;
};

export type FactorGrade = {
  [key: string]: string;
};

export const FactorGrades = () => {
  const { data, isError, isLoading } = useFactorGradesQuery([
    'now',
    '3m',
    '6m',
  ]);

  const items: Item[] = useMemo(() => {
    if (!data) {
      return [];
    }

    const preparedData = data.map(mapResponse);

    const now = preparedData[0];
    const m3 = preparedData[1];
    const m6 = preparedData[2];

    return Object.keys(now).map((key) => ({
      title: key,
      0: now[key],
      3: m3[key],
      6: m6[key],
    }));
  }, [data]);

  return (
    <Card<Item>
      title="Factor Grades"
      layout="table"
      items={items}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
    />
  );
};
