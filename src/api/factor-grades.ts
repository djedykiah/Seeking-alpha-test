import { useQuery } from '@tanstack/react-query';
import { http } from '../lib';

type FactorGradesResponse = {
  [key: string]: {
    current: string
  }
}

export const useFactorGradesQuery = (interval: 'now' | '3m' | '6m') => useQuery<FactorGradesResponse>({
  queryKey: ['factor-grades', interval],
  queryFn: async () => {
    const { data } = await http.get<FactorGradesResponse>(`/factor-grades/${interval}`);

    return data;
  },
});
