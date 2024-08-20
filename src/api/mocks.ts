import { FactorGradesResponse } from './factor-grades';
import { QuantRankingResponse } from './quant-ranking';
import { RatingsSummaryResponse } from './ratings-summary';
import { UserResponse } from './user';

export const fg0: FactorGradesResponse = {
  Key1: {
    current: 'F',
  },
  Key2: {
    current: 'F',
  },
  Key3: {
    current: 'F',
  },
  Key4: {
    current: 'F',
  },
  Key5: {
    current: 'F',
  },
};

export const fg3: FactorGradesResponse = {
  Key1: 'B',
  Key2: 'B',
  Key3: 'B',
  Key4: 'B',
  Key5: 'B',
};

export const fg6: FactorGradesResponse = {
  // @ts-ignore
  data: [
    ['Key1', 'С'],
    ['Key2', 'С'],
    ['Key3', 'С'],
    ['Key4', 'С'],
    ['Key5', 'С'],
  ],
};

export const fgs: any = {
  now: fg0,
  '3m': fg3,
  '6m': fg6,
};

export const rs: RatingsSummaryResponse = {
  Key1: {
    rating: 'HOLD',
    score: 20,
  },
  Key2: {
    rating: 'BUY',
    score: 12,
  },
  Key3: {
    rating: 'BUY',
    score: 12,
  },
};

export const qr: QuantRankingResponse = {
  industry: 'Industry',
  sector: 'Sector',
  rankings: {
    overall: {
      rank: 825,
      total: 44432,
    },
    sector: {
      rank: 105,
      total: 522,
    },
    industry_specific: {
      rank: 8,
      total: 28,
    },
  },
};

export const usr: UserResponse = {
  premium: true,
};
