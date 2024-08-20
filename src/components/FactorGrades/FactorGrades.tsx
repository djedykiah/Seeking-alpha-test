import { useMemo } from 'react';

import {
  FactorGrades as FactorGradesType,
  Interval,
  useFactorGradesQuery,
} from '../../api';
import { Card } from '../Card';
import { Column, Table } from '../Table';

type Item = {
  title: string;
  now: string;
  '3m': string;
  '6m': string;
};

const columns: Column<Item>[] = [
  {
    field: 'title',
    align: 'left',
    href: '/',
  },
  {
    field: 'now',
    align: 'center',
    title: 'Now',
  },
  {
    field: '3m',
    align: 'center',
    title: '3M ago',
  },
  {
    field: '6m',
    align: 'center',
    title: '6M ago',
  },
];

const getIntervalsTypes = (factorGrades: FactorGradesType): Interval[] =>
  Object.keys(factorGrades) as Interval[];

export const FactorGrades = () => {
  const { data, isError, isLoading, error } = useFactorGradesQuery([
    'now',
    '3m',
    '6m',
  ]);

  const items: Item[] = useMemo(() => {
    if (!data) {
      return [];
    }

    const titles = [
      ...new Set(
        Object.values(data).flatMap((intervalObj) => Object.keys(intervalObj)),
      ),
    ];

    return titles.map((title) =>
      getIntervalsTypes(data).reduce(
        (acc, interval) => ({
          ...acc,
          [interval]: data[interval][title] ?? '',
        }),
        { title } as Item,
      ),
    );
  }, [data]);

  return (
    <Card title="Factor Grades" isLoading={isLoading} minHeight={333}>
      {isError ? (
        <p>Unable to fetch data. Try again in a few moments. {error.message}</p>
      ) : (
        <Table data={items} columns={columns} />
      )}
    </Card>
  );
};
