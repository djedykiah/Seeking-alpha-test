import { Card } from '../Card';
import { Loader } from '../Loader';

import { CARD_MIN_HEIGHT, CARD_TITLE } from './const';

export const QuantRankingLoader = () => (
  <Card title={CARD_TITLE} minHeight={CARD_MIN_HEIGHT}>
    <Loader />
  </Card>
);
