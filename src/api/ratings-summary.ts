import { useQuery } from '@tanstack/react-query';
import { http } from '../lib';

type RatingsSummaryResponse = {
  [key: string]: {
    rating: 'HOLD' | 'BUY',
    score: number
  }
}

export const useRatingsSummaryQuery = () => useQuery<RatingsSummaryResponse>({
  queryKey: ['ratings-summary'],
  queryFn: async () => {
    const { data } = await http.get<RatingsSummaryResponse>('/ratings-summary');

    return data;
  },
});
