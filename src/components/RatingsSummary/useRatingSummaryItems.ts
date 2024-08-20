import { useMemo } from 'react';

import { Rating, useRatingsSummaryQuery } from '../../api';

export type RatingSummaryItem = {
  title: string;
  rating: Rating;
  score: string;
};

type Api = {
  items: RatingSummaryItem[];
  isLoading: boolean;
  error: Error | null;
};

export const useRatingSummaryItems = (): Api => {
  const { data, isLoading, error } = useRatingsSummaryQuery();

  const items: RatingSummaryItem[] = useMemo(() => {
    if (!data) {
      return [];
    }

    return Object.entries(data).map(([key, { rating, score }]) => ({
      title: key.replace(/_/g, ' '),
      rating,
      score: score.toFixed(2),
    }));
  }, [data]);

  return {
    items,
    isLoading,
    error,
  };
};
