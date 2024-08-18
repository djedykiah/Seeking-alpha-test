import { useRatingsSummaryQuery } from '../../api';
import { Card } from '../Card';

const columns = [
  {
    field: 'label',
    align: 'left',
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

  return (
    <Card
      title="Ratings Summary"
      layout="table"
      items={data as any}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      isPermitted
    />
  );
};
