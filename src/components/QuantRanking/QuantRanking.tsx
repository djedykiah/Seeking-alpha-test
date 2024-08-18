import { useQuantRankingQuery } from '../../api';
import { Card } from '../Card';

export const QuantRanking = () => {
  const { data = [], isError, isLoading } = useQuantRankingQuery();

  return (
    <Card<any>
      title="Quant Ranking"
      items={[]}
      layout="list"
      isLoading={isLoading}
      isError={isError}
    />
  );
};
