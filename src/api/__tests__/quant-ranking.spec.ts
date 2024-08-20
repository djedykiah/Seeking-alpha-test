import { renderHook, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';

import { createWrapper } from '../../testUtils';
import { request } from '../httpUtils';
import { QuantRankingResponse, useQuantRankingQuery } from '../quant-ranking';

vi.mock('../httpUtils', () => ({
  request: vi.fn(),
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
    (request as Mock).mockResolvedValueOnce(mockQuantRankingResponse);

    const { result } = renderHook(() => useQuantRankingQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockQuantRankingResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(request).toHaveBeenCalledWith('/quant-ranking');
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch');
    (request as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useQuantRankingQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(request).toHaveBeenCalledWith('/quant-ranking');
  });
});
