import { ReactNode, useMemo } from 'react';

import { useQuantRankingQuery } from '../../api';
import { capitalize } from '../../utils';
import { Card } from '../Card';
import { Link } from '../Link';

export const QuantRanking = () => {
  const { data, isError, isLoading } = useQuantRankingQuery();

  const items = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      ['Sector', <Link to={`/sector/${data.sector}`}>{data.sector}</Link>],
      [
        'Industry',
        <Link to={`/industry/${data.industry}`}>{data.industry}</Link>,
      ],
      ...Object.entries(data.rankings).map(([key, { rank, total }], index) => [
        `Ranked ${index !== 0 ? 'in' : ''} ${capitalize(
          key.split('_')?.at(0) ?? '',
        )}`,
        <Link to={`/ranking/${key}`}>
          <strong>{rank}</strong> out of <strong>{total}</strong>
        </Link>,
      ]),
    ];
  }, [data]);

  return (
    <Card<ReactNode[]>
      title="Quant Ranking"
      items={items}
      layout="list"
      isLoading={isLoading}
      isError={isError}
      footer={
        <Link to="/quant-ratings">
          <strong>Quant Ratings Beat The Market {'>>'}</strong>
        </Link>
      }
    />
  );
};
