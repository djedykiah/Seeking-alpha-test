import { useMemo } from 'react';

import { Interval, useFactorGradesQuery } from '../../api';

export type FactorGradesItem = {
  title: string;
} & Record<Interval, string>;

const intervals: Interval[] = ['now', '3m', '6m'];

type Api = {
  isLoading: boolean;
  error: Error | null;
  items: FactorGradesItem[];
};

export const useFactorGradesItems = (): Api => {
  const { data, isLoading, error } = useFactorGradesQuery(intervals);

  const items: FactorGradesItem[] = useMemo(() => {
    if (!data) {
      return [];
    }

    const titles = [
      ...new Set(
        Object.values(data).flatMap((intervalObj) => Object.keys(intervalObj)),
      ),
    ];

    return titles.map((title) =>
      intervals.reduce(
        (acc, interval) => ({
          ...acc,
          [interval]: data[interval][title] ?? '',
        }),
        { title } as FactorGradesItem,
      ),
    );
  }, [data]);

  return {
    items,
    isLoading,
    error,
  };
};
