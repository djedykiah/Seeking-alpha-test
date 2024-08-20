import { ReactNode, useMemo } from 'react';

import {
  QuantRankingResponse,
  RankingType,
  useQuantRankingQuery,
} from '../../api';
import { Link } from '../Link';

import { getRankingTitle } from './getRankingTitle';

type QuantRankingItem = {
  title: string;
  value: ReactNode;
};

type Api = {
  items: QuantRankingItem[];
  error: Error | null;
  isLoading: boolean;
};

const getRankingsTypes = (
  rankings: QuantRankingResponse['rankings'],
): RankingType[] => Object.keys(rankings) as RankingType[];

export const useQuantRankingItems = (): Api => {
  const { data, isLoading, error } = useQuantRankingQuery();

  const items: QuantRankingItem[] = useMemo(() => {
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

  return {
    items,
    isLoading,
    error,
  };
};
