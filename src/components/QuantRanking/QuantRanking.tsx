import { Card } from '../Card';
import { ErrorMessage } from '../ErrorMessage';
import { Link } from '../Link';

import { CARD_MIN_HEIGHT, CARD_TITLE } from './const';
import { List } from './List';
import { QuantRankingLoader } from './QuantRankingLoader';
import { useQuantRankingItems } from './useQuantRankingItems';

import styles from './QuantRanking.module.css';

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
          <footer className={styles.footer}>
            <Link to="/quant-ratings">
              <strong className={styles.link}>
                Quant Ratings Beat The Market »
              </strong>
            </Link>
          </footer>
        </>
      )}
    </Card>
  );
};
