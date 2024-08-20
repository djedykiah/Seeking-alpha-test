import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

import { createWrapper } from '../../testUtils';
import { request } from '../httpUtils';
import { useRatingsSummaryQuery } from '../ratings-summary';

vi.mock('../httpUtils', () => ({
  request: vi.fn(),
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
    (request as Mock).mockResolvedValueOnce(mockRatingsSummaryResponse);

    const { result } = renderHook(() => useRatingsSummaryQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockRatingsSummaryResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(request).toHaveBeenCalledWith('/ratings-summary');
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch');
    (request as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useRatingsSummaryQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(request).toHaveBeenCalledWith('/ratings-summary');
  });
});
