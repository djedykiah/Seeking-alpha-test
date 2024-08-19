import { useQuery } from '@tanstack/react-query';

import { http } from '../lib';
import { resolveAfter } from '../utils';

import { usr } from './mocks';

export type UserResponse = {
  premium: boolean;
};

export const useUserQuery = () =>
  useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: async () => {
      // const { data: user } = await http.get<UserResponse>('/user');

      const user = resolveAfter(usr, 100);

      return user;
    },
  });
