import { useMemo } from 'react';

import { RatingsSummaryResponse, useRatingsSummaryQuery } from '../../api';
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

export type RatingSummaryItem = {
  title: string;
  rating: 'HOLD' | 'BUY';
  score: number;
};

export const RatingsSummary = () => {
  const { data, isError, isLoading } = useRatingsSummaryQuery();

  const items = useMemo(() => {
    if (!data) {
      return null;
    }

    return Object.entries(data)?.map(([key, value]) => ({
      title: key?.replace(/_/g, ' '),
      rating: value?.rating,
      score: value?.score,
    }));
  }, [data]);

  return (
    <Card<RatingSummaryItem>
      title="Ratings Summary"
      layout="table"
      items={items}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
    />
  );
};
