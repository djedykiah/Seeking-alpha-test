import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';

import { createWrapper } from '../../testUtils';
import { request } from '../httpUtils';
import { useUserQuery } from '../user';

vi.mock('../httpUtils', () => ({
  request: vi.fn(),
}));

describe('useUserQuery', () => {
  it('should fetch user data and return it', async () => {
    const mockUserResponse = { premium: true };
    (request as Mock).mockResolvedValueOnce(mockUserResponse);

    const { result } = renderHook(() => useUserQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockUserResponse);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(request).toHaveBeenCalledWith('/user');
  });

  it('should handle errors', async () => {
    const mockError = new Error('Failed to fetch');
    (request as Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useUserQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isLoading).toBe(false);
    expect(request).toHaveBeenCalledWith('/user');
  });
});
