import { Column } from '../Table';

import { FactorGradesItem } from './useFactorGradesItems';

export const columns: Column<FactorGradesItem>[] = [
  {
    field: 'title',
    align: 'left',
    href: '/',
  },
  {
    field: 'now',
    align: 'center',
    title: 'Now',
  },
  {
    field: '3m',
    align: 'center',
    title: '3M ago',
  },
  {
    field: '6m',
    align: 'center',
    title: '6M ago',
  },
];
