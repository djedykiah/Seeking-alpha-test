import { useMemo } from 'react';

import { useRatingsSummaryQuery } from '../../api';
import { Card } from '../Card';
import { Column } from '../Card/Table/Table';

import { mapResponse } from './mapResponse';

const columns: Column[] = [
  {
    field: 'label',
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
  label: string;
  rating: 'HOLD' | 'BUY';
  score: number;
};

export const RatingsSummary = () => {
  const { data = [], isError, isLoading } = useRatingsSummaryQuery();

  const preparedData = useMemo(() => mapResponse(data), [data]);

  return (
    <Card<RatingSummaryItem>
      title="Ratings Summary"
      layout="table"
      items={preparedData}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
    />
  );
};
