import { useQuery } from '@tanstack/react-query';

import { http } from '../lib';

type Ranking = {
  rank: number;
  total: number;
};

export type QuantRankingResponse = {
  sector: string;
  industry: string;
  rankings: {
    industry_specific: Ranking;
    overall: Ranking;
    sector: Ranking;
  };
};

export type RankingType = keyof QuantRankingResponse['rankings'];

export const useQuantRankingQuery = () =>
  useQuery<QuantRankingResponse>({
    queryKey: ['quant-ranking'],
    queryFn: async () => {
      const { data } = await http.get<QuantRankingResponse>('/quant-ranking');

      return data;
    },
  });
