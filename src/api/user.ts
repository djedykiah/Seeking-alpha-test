import { useQuery } from '@tanstack/react-query';

import { request } from './http-utils';

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
