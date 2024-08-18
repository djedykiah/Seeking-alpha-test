import { useQuery } from '@tanstack/react-query';

import { http } from '../lib';

type UserResponse = {
  premium: boolean;
};

export const useUserQuery = () =>
  useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: user } = await http.get<UserResponse>('/user');

      return user;
    },
  });
