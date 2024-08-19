import { useQuery } from '@tanstack/react-query';

import { http } from '../lib';
import { resolveAfter } from '../utils';

import { fgs } from './mocks';

export type FactorGradesResponse =
  | {
      [key: string]: {
        current: string;
      };
    }
  | {
      [key: string]: string;
    }
  | {
      data: [[string, string][]];
    };

export type FactorGrade = {
  [key: string]: string;
};

export const mapResponse = (res: FactorGradesResponse): FactorGrade => {
  if (res.data && Array.isArray(res.data)) {
    return res.data.reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key as unknown as string]: value,
      }),
      {},
    );
  } else {
    return Object.entries(res).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key as unknown as string]: value?.current ?? value,
      }),
      {},
    );
  }
};

const getFactorGradesByInterval = async (
  interval: string,
): Promise<FactorGrade> => {
  // const { data } = await http.get<FactorGradesResponse>(
  //   `/factor-grades/${interval}`,
  // );

  const data = await resolveAfter(fgs[interval], 3000);

  return mapResponse(data);
};

export const useFactorGradesQuery = (intervals: string[]) =>
  useQuery<FactorGrade[]>({
    queryKey: ['factor-grades', intervals],
    queryFn: async () => {
      const data = await Promise.all(intervals.map(getFactorGradesByInterval));

      return data;
    },
  });
