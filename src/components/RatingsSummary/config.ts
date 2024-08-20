import { Column } from '../Table';

import { RatingSummaryItem } from './useRatingSummaryItems';

export const columns: Column<RatingSummaryItem>[] = [
  {
    field: 'title',
    align: 'left',
    href: '/',
  },
  {
    field: 'rating',
    align: 'center',
  },
  {
    field: 'score',
    align: 'center',
  },
];
