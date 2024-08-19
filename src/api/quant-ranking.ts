import { useQuery } from '@tanstack/react-query';

import { http } from '../lib';

export type QuantRankingResponse = {
  sector: string;
  industry: string;
  rankings: {
    [key: string]: {
      rank: number;
      total: number;
    };
  };
};

export const useQuantRankingQuery = () =>
  useQuery<QuantRankingResponse>({
    queryKey: ['quant-ranking'],
    queryFn: async () => {
      const { data } = await http.get<QuantRankingResponse>('/quant-ranking');

      return data;
    },
  });
