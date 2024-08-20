import { useQuery } from '@tanstack/react-query';

import { request } from './httpUtils';

export type UserResponse = {
  premium: boolean;
};

export const useUserQuery = () =>
  useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: async () => {
      const user = await request('/user');

      return user;
    },
  });
