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

const getFactorGradesByInterval = async (
  interval: string,
): Promise<FactorGradesResponse> => {
  // const { data } = await http.get<FactorGradesResponse>(
  //   `/factor-grades/${interval}`,
  // );

  const data = await resolveAfter(fgs[interval], 3000);

  return data;
};

export const useFactorGradesQuery = (intervals: string[]) =>
  useQuery<FactorGradesResponse[]>({
    queryKey: ['factor-grades', intervals],
    queryFn: async () => {
      const data = await Promise.all(intervals.map(getFactorGradesByInterval));

      return data;
    },
  });
