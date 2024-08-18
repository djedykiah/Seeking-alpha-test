import { RatingsSummaryResponse } from '../../api';

import { RatingSummaryItem } from './RatingsSummary';

export const mapResponse = (res: RatingsSummaryResponse): RatingSummaryItem[] =>
  Object.entries(res)?.map(([key, value]) => ({
    label: key?.replace(/_/g, ' '),
    rating: value?.rating,
    score: value?.score,
  }));
