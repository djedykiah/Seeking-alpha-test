import { Card } from '../Card';
import { ErrorMessage } from '../ErrorMessage';
import { Table } from '../Table';

import { columns } from './config';
import { CARD_MIN_HEIGHT, CARD_TITLE } from './const';
import { RatingsSummaryLoader } from './RatingsSummaryLoader';
import { useRatingSummaryItems } from './useRatingSummaryItems';

export const RatingsSummary = () => {
  const { items, isLoading, error } = useRatingSummaryItems();

  if (isLoading) {
    return <RatingsSummaryLoader />;
  }

  return (
    <Card title={CARD_TITLE} minHeight={CARD_MIN_HEIGHT}>
      {error ? (
        <ErrorMessage reason={error.message} />
      ) : (
        <Table data={items} columns={columns} />
      )}
    </Card>
  );
};
