import { useQuery } from '@tanstack/react-query';

import { request } from './http-utils';

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
    queryFn: () => request('/ratings-summary'),
  });
