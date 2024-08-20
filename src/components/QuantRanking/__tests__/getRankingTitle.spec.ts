import { RankingType } from 'api';

import { getRankingTitle } from '../getRankingTitle';

describe('getRankingTitle', () => {
  it.each([
    {
      input: 'industry_specific',
      expected: 'Ranked in Industry',
    },
    {
      input: 'overall',
      expected: 'Ranked Overall',
    },
    {
      input: 'sector',
      expected: 'Ranked in Sector',
    },
    {
      input: 'some_unknown_ranking',
      expected: '',
    },
  ])(
    'should return a correct title for $input ranking',
    ({ input, expected }) => {
      expect(getRankingTitle(input as RankingType)).toEqual(expected);
    },
  );
});
