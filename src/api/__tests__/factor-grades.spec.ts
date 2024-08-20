import { renderHook, waitFor } from '@testing-library/react';
import { Mock } from 'vitest';

import { createWrapper } from '../../testUtils';
import {
  FactorGradesResponse,
  Interval,
  useFactorGradesQuery,
} from '../factor-grades';
import { request } from '../httpUtils';

vi.mock('../httpUtils', () => ({
  request: vi.fn(),
}));

describe('useFactorGradesQuery', () => {
  const mockFactorGradesNowResponse: FactorGradesResponse = {
    Key1: {
      current: 'F',
    },
    Key2: {
      current: 'F',
    },
    Key3: {
      current: 'F',
    },
    Key4: {
      current: 'F',
    },
    Key5: {
      current: 'F',
    },
  };

  const mockFactorGrades3mResponse: FactorGradesResponse = {
    Key1: 'B',
    Key2: 'B',
    Key3: 'B',
    Key4: 'B',
    Key5: 'B',
  };

  const mockFactorGrades6mResponse: FactorGradesResponse = {
    data: [
      ['Key1', 'С'],
      ['Key2', 'С'],
      ['Key3', 'С'],
      ['Key4', 'С'],
      ['Key5', 'С'],
    ],
  };

  const intervals: Interval[] = ['now', '3m', '6m'];

  it('should fetch quant rankings for provided intervals', async () => {
    (request as Mock)
      .mockResolvedValueOnce(mockFactorGradesNowResponse)
      .mockResolvedValueOnce(mockFactorGrades3mResponse)
      .mockResolvedValueOnce(mockFactorGrades6mResponse);

    const { result } = renderHook(() => useFactorGradesQuery(intervals), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(request).toHaveBeenCalledTimes(3);
    expect(request).toHaveBeenCalledWith('/factor-grades/now');
    expect(request).toHaveBeenCalledWith('/factor-grades/3m');
    expect(request).toHaveBeenCalledWith('/factor-grades/6m');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('should return rankings for now interval', async () => {
    (request as Mock)
      .mockResolvedValueOnce(mockFactorGradesNowResponse)
      .mockResolvedValueOnce(mockFactorGrades3mResponse)
      .mockResolvedValueOnce(mockFactorGrades6mResponse);

    const { result } = renderHook(() => useFactorGradesQuery(intervals), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.now).toEqual({
      Key1: 'F',
      Key2: 'F',
      Key3: 'F',
      Key4: 'F',
      Key5: 'F',
    });
  });

  it('should return rankings for 3m interval', async () => {
    (request as Mock)
      .mockResolvedValueOnce(mockFactorGradesNowResponse)
      .mockResolvedValueOnce(mockFactorGrades3mResponse)
      .mockResolvedValueOnce(mockFactorGrades6mResponse);

    const { result } = renderHook(() => useFactorGradesQuery(intervals), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['3m']).toEqual({
      Key1: 'B',
      Key2: 'B',
      Key3: 'B',
      Key4: 'B',
      Key5: 'B',
    });
  });

  it('should return rankings for 6m interval', async () => {
    (request as Mock)
      .mockResolvedValueOnce(mockFactorGradesNowResponse)
      .mockResolvedValueOnce(mockFactorGrades3mResponse)
      .mockResolvedValueOnce(mockFactorGrades6mResponse);

    const { result } = renderHook(() => useFactorGradesQuery(intervals), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['6m']).toEqual({
      Key1: 'С',
      Key2: 'С',
      Key3: 'С',
      Key4: 'С',
      Key5: 'С',
    });
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch');
    (request as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFactorGradesQuery(intervals), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(request).toHaveBeenCalledTimes(3);
    expect(request).toHaveBeenCalledWith('/factor-grades/now');
    expect(request).toHaveBeenCalledWith('/factor-grades/3m');
    expect(request).toHaveBeenCalledWith('/factor-grades/6m');
  });
});
