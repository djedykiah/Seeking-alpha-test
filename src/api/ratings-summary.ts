import { useQuery } from '@tanstack/react-query';

import { http } from '../lib';

type RatingsSummaryResponse = {
  [key: string]: {
    rating: 'HOLD' | 'BUY';
    score: number;
  };
};

const mapResponse = (res: RatingsSummaryResponse): any =>
  Object.entries(res)?.map(([key, value]) => ({
    label: key?.replace(/_/g, ' '),
    rating: value?.rating,
    score: value?.score,
  }));

export const useRatingsSummaryQuery = () =>
  useQuery<RatingsSummaryResponse>({
    queryKey: ['ratings-summary'],
    queryFn: async () => {
      const { data } = await http.get<RatingsSummaryResponse>(
        '/ratings-summary',
      );

      return mapResponse(data);
    },
  });
