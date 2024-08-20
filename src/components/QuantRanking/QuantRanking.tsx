import { Card } from '../Card';
import { ErrorMessage } from '../ErrorMessage';
import { Link } from '../Link';

import { CARD_MIN_HEIGHT, CARD_TITLE } from './const';
import { List } from './List';
import { QuantRankingLoader } from './QuantRankingLoader';
import { useQuantRankingItems } from './useQuantRankingItems';

export const QuantRanking = () => {
  const { items, isLoading, error } = useQuantRankingItems();

  if (isLoading) {
    return <QuantRankingLoader />;
  }

  return (
    <Card title={CARD_TITLE} minHeight={CARD_MIN_HEIGHT}>
      {error ? (
        <ErrorMessage reason={error.message} />
      ) : (
        <>
          <List items={items} />
          <footer style={{ marginTop: 15 }}>
            <Link to="/quant-ratings">
              <strong>Quant Ratings Beat The Market {'>>'}</strong>
            </Link>
          </footer>
        </>
      )}
    </Card>
  );
};
