import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

import { http } from '../../lib';
import { createWrapper } from '../../testUtils';
import { QuantRankingResponse, useQuantRankingQuery } from '../quant-ranking';

vi.mock('../../lib', () => ({
  http: {
    get: vi.fn(),
  },
}));

describe('useQuantRankingQuery', () => {
  it('should fetch quant ranking and return it', async () => {
    const mockQuantRankingResponse: QuantRankingResponse = {
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
    (http.get as Mock).mockResolvedValueOnce({
      data: mockQuantRankingResponse,
    });

    const { result } = renderHook(() => useQuantRankingQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockQuantRankingResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(http.get).toHaveBeenCalledWith('/quant-ranking');
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch');
    (http.get as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useQuantRankingQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(http.get).toHaveBeenCalledWith('/quant-ranking');
  });
});
