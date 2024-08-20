import { Card } from '../Card';
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
        <p>Unable to fetch data. Try again in a few moments.</p>
      ) : (
        <Table data={items} columns={columns} />
      )}
    </Card>
  );
};
