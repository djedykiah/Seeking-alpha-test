import { renderHook } from '@testing-library/react';
import { Mock } from 'vitest';

import { useFactorGradesQuery } from '../../../api';
import { useFactorGradesItems } from '../useFactorGradesItems';

vi.mock('../../../api', () => ({
  useFactorGradesQuery: vi.fn(),
}));

describe('useFactorGradesItems', () => {
  it('should return loading state', () => {
    (useFactorGradesQuery as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { result } = renderHook(() => useFactorGradesItems());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.items).toEqual([]);
  });

  it('should return error state', () => {
    const error = new Error('Failed to fetch');
    (useFactorGradesQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error,
    });

    const { result } = renderHook(() => useFactorGradesItems());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(error);
    expect(result.current.items).toEqual([]);
  });

  it('should return items when data is available', () => {
    const mockData = {
      now: { Factor1: 'Grade1', Factor2: 'Grade2' },
      '3m': { Factor1: 'Grade1-3m', Factor2: 'Grade2-3m' },
      '6m': { Factor1: 'Grade1-6m', Factor2: 'Grade2-6m' },
    };
    (useFactorGradesQuery as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useFactorGradesItems());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.items).toEqual([
      { title: 'Factor1', now: 'Grade1', '3m': 'Grade1-3m', '6m': 'Grade1-6m' },
      { title: 'Factor2', now: 'Grade2', '3m': 'Grade2-3m', '6m': 'Grade2-6m' },
    ]);
  });

  it('should handle case when data is undefined', () => {
    (useFactorGradesQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
    });

    const { result } = renderHook(() => useFactorGradesItems());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.items).toEqual([]);
  });
});
