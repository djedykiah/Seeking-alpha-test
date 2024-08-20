import { Card } from '../Card';
import { ErrorMessage } from '../ErrorMessage';
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
        <ErrorMessage reason={error.message} />
      ) : (
        <Table data={items} columns={columns} />
      )}
    </Card>
  );
};
