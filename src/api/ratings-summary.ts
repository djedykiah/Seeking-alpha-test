import { useQuery } from '@tanstack/react-query';

import { http } from '../lib';

export type Rating = 'HOLD' | 'BUY';

export type RatingsSummaryResponse = Record<
  string,
  {
    rating: Rating;
    score: number;
  }
>;

export const useRatingsSummaryQuery = () =>
  useQuery<RatingsSummaryResponse>({
    queryKey: ['ratings-summary'],
    queryFn: async () => {
      const { data } = await http.get<RatingsSummaryResponse>(
        '/ratings-summary',
      );

      return data;
    },
  });
