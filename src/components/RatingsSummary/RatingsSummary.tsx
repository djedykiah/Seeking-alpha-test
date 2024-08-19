import { useMemo } from 'react';

import { useRatingsSummaryQuery } from '../../api';
import { Card } from '../Card';
import { Column } from '../Card/Table';

const columns: Column[] = [
  {
    field: 'title',
    align: 'left',
    href: '/',
  },
  {
    field: 'rating',
    align: 'center',
  },
  {
    field: 'score',
    align: 'center',
  },
];

export type Item = {
  title: string;
  rating: 'HOLD' | 'BUY';
  score: number;
};

export const RatingsSummary = () => {
  const { data, isError, isLoading } = useRatingsSummaryQuery();

  const items: Item[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return Object.entries(data)?.map(([key, value]) => ({
      title: key?.replace(/_/g, ' '),
      rating: value?.rating,
      score: value?.score,
    }));
  }, [data]);

  return (
    <Card<Item>
      title="Ratings Summary"
      layout="table"
      items={items}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
    />
  );
};
