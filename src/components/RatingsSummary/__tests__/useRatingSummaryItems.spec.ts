import { renderHook } from '@testing-library/react';
import { Mock } from 'vitest';

import { useRatingsSummaryQuery } from '../../../api';
import { useRatingSummaryItems } from '../useRatingSummaryItems';

vi.mock('../../../api', () => ({
  useRatingsSummaryQuery: vi.fn(),
}));

describe('useRatingSummaryItems', () => {
  it('returns items correctly', () => {
    (useRatingsSummaryQuery as Mock).mockReturnValue({
      data: {
        Rating_1: { rating: 4, score: 90 },
        Rating_2: { rating: 5, score: 80 },
      },
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useRatingSummaryItems());

    expect(result.current.items).toEqual([
      { title: 'Rating 1', rating: 4, score: 90 },
      { title: 'Rating 2', rating: 5, score: 80 },
    ]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('handles loading state', () => {
    (useRatingsSummaryQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useRatingSummaryItems());

    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it('handles error state', () => {
    (useRatingsSummaryQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Something went wrong'),
    });

    const { result } = renderHook(() => useRatingSummaryItems());

    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toEqual(new Error('Something went wrong'));
  });

  it('handles case where data is undefined', () => {
    (useRatingsSummaryQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useRatingSummaryItems());

    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
