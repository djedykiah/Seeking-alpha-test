import { useQuery } from '@tanstack/react-query';

import { resolveAfter } from '../utils';

import { request } from './httpUtils';
import { usr } from './mocks';

export type UserResponse = {
  premium: boolean;
};

export const useUserQuery = () =>
  useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: async () => {
      // const user = await request('/user');

      const user = resolveAfter(usr, 100);

      return user;
    },
  });
