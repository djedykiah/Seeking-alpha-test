import { Card } from '../Card';
import { Table } from '../Table';

import { columns } from './config';
import { CARD_MIN_HEIGHT, CARD_TITLE } from './const';
import { FactorGradesLoader } from './FactorGradesLoader';
import { useFactorGradesItems } from './useFactorGradesItems';

export const FactorGrades = () => {
  const { items, isLoading, error } = useFactorGradesItems();

  if (isLoading) {
    return <FactorGradesLoader />;
  }

  return (
    <Card title={CARD_TITLE} minHeight={CARD_MIN_HEIGHT}>
      {error ? (
        <p>Unable to fetch data. Try again in a few moments. {error.message}</p>
      ) : (
        <Table data={items} columns={columns} />
      )}
    </Card>
  );
};
