import { RankingType } from '../../api';

export const getRankingTitle = (ranking: RankingType): string => {
  if (ranking === 'industry_specific') {
    return 'Ranked in Industry';
  }

  if (ranking === 'overall') {
    return 'Ranked Overall';
  }

  if (ranking === 'sector') {
    return 'Ranked in Sector';
  }

  return '';
};
