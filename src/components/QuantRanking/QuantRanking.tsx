import { useMemo } from 'react';

import {
  QuantRankingResponse,
  RankingType,
  useQuantRankingQuery,
} from '../../api';
import { Card } from '../Card';
import { Link } from '../Link';

import { getRankingTitle } from './getRankingTitle';
import { List } from './List';

const getRankingsTypes = (
  rankings: QuantRankingResponse['rankings'],
): RankingType[] => Object.keys(rankings) as RankingType[];

export const QuantRanking = () => {
  const { data, isError, isLoading } = useQuantRankingQuery();

  const items = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        title: 'Sector',
        value: <Link to={`/sector/${data.sector}`}>{data.sector}</Link>,
      },
      {
        title: 'Industry',
        value: <Link to={`/industry/${data.industry}`}>{data.industry}</Link>,
      },
      ...getRankingsTypes(data.rankings).map((ranking) => ({
        title: getRankingTitle(ranking),
        value: (
          <Link to={`/ranking/${ranking}`}>
            <strong>{data.rankings[ranking].rank}</strong> out of{' '}
            <strong>{data.rankings[ranking].total}</strong>
          </Link>
        ),
      })),
    ];
  }, [data]);

  return (
    <Card title="Quant Ranking" isLoading={isLoading} minHeight={407}>
      {isError ? (
        <p>Unable to fetch data. Try again in a few moments.</p>
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
