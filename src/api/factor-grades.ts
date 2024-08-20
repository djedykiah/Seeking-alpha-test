import { useQuery } from '@tanstack/react-query';

import { request } from './http-utils';

export type Interval = 'now' | '3m' | '6m';

type FactorGradesNowResponse = Record<
  string,
  {
    current: string;
  }
>;

type FactorGrades3MResponse = Record<string, string>;

type FactorGrades6MResponse = {
  data: [string, string][];
};

export type FactorGradesResponse =
  | FactorGradesNowResponse
  | FactorGrades3MResponse
  | FactorGrades6MResponse;

export type FactorGrade = Record<string, string>;

export type FactorGrades = Record<Interval, FactorGrade>;

const mapFactorGrades6mResponse = (res: FactorGrades6MResponse): FactorGrade =>
  res.data.reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value,
    }),
    {},
  );

const mapFactorGradesNowResponse = (
  res: FactorGradesNowResponse,
): FactorGrade =>
  Object.entries(res).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value?.current,
    }),
    {},
  );

const getFactorGradesByInterval = async (
  interval: Interval,
): Promise<FactorGrade> => {
  const data = await request(`/factor-grades/${interval}`);

  if (interval === 'now') {
    return mapFactorGradesNowResponse(data);
  }

  if (interval === '6m') {
    return mapFactorGrades6mResponse(data);
  }

  return data;
};

const groupFactorGradesByInterval = (
  factorGrades: FactorGrade[],
  intervals: Interval[],
): FactorGrades =>
  factorGrades.reduce(
    (acc, curr, index) => ({
      ...acc,
      [intervals[index]]: curr,
    }),
    {} as FactorGrades,
  );

export const useFactorGradesQuery = (intervals: Interval[]) =>
  useQuery<FactorGrades>({
    queryKey: ['factor-grades', intervals],
    queryFn: async () => {
      const factorGrades = await Promise.all(
        intervals.map(getFactorGradesByInterval),
      );

      return groupFactorGradesByInterval(factorGrades, intervals);
    },
  });
