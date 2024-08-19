import { FactorGradesResponse } from 'api';

import { FactorGrade } from './FactorGrades';

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
