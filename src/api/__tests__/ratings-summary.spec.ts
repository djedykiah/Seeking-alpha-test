import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

import { http } from '../../lib';
import { createWrapper } from '../../testUtils';
import { useRatingsSummaryQuery } from '../ratings-summary';

vi.mock('../../lib', () => ({
  http: {
    get: vi.fn(),
  },
}));

describe('useRatingsSummaryQuery', () => {
  it('should fetch rating summary and return it', async () => {
    const mockRatingsSummaryResponse = {
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
    (http.get as Mock).mockResolvedValueOnce({
      data: mockRatingsSummaryResponse,
    });

    const { result } = renderHook(() => useRatingsSummaryQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockRatingsSummaryResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(http.get).toHaveBeenCalledWith('/ratings-summary');
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch');
    (http.get as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useRatingsSummaryQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(http.get).toHaveBeenCalledWith('/ratings-summary');
  });
});
