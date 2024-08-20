import { renderHook } from '@testing-library/react';
import { Mock } from 'vitest';

import { useQuantRankingQuery } from '../../../api';
import { useQuantRankingItems } from '../useQuantRankingItems';

vi.mock('../../../api', () => ({
  useQuantRankingQuery: vi.fn(),
}));

vi.mock('../getRankingTitle', () => ({
  getRankingTitle: vi
    .fn()
    .mockImplementation((ranking: string) => `Title for ${ranking}`),
}));

describe('useQuantRankingItems', () => {
  it('should return loading state', () => {
    (useQuantRankingQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useQuantRankingItems());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.items).toEqual([]);
  });

  it('should return error state', () => {
    const error = new Error('Failed to fetch');
    (useQuantRankingQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error,
    });

    const { result } = renderHook(() => useQuantRankingItems());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(error);
    expect(result.current.items).toEqual([]);
  });

  it('should return items when data is available', () => {
    const mockData = {
      sector: 'Tech',
      industry: 'Software',
      rankings: {
        type1: { rank: 1, total: 10 },
        type2: { rank: 5, total: 20 },
      },
    };
    (useQuantRankingQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useQuantRankingItems());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();

    expect(result.current.items).toMatchSnapshot();
  });

  it('should handle case when data is undefined', () => {
    (useQuantRankingQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useQuantRankingItems());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.items).toEqual([]);
  });
});
