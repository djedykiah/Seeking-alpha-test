import { useMemo } from 'react';

import { Rating, useRatingsSummaryQuery } from '../../api';
import { Card } from '../Card';
import { Column, Table } from '../Table';

export type Item = {
  title: string;
  rating: Rating;
  score: number;
};

const columns: Column<Item>[] = [
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

export const RatingsSummary = () => {
  const { data, isError, isLoading } = useRatingsSummaryQuery();

  const items: Item[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return Object.entries(data).map(([key, { rating, score }]) => ({
      title: key.replace(/_/g, ' '),
      rating,
      score,
    }));
  }, [data]);

  return (
    <Card title="Ratings Summary" isLoading={isLoading} minHeight={222}>
      {isError ? (
        <p>Unable to fetch data. Try again in a few moments.</p>
      ) : (
        <Table data={items} columns={columns} />
      )}
    </Card>
  );
};
