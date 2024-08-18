import { FC, ReactNode } from 'react';

import { useUserQuery } from '../../api';

type Props = {
  children: ReactNode;
};

export const Premium: FC<Props> = ({ children }) => {
  const { data: user } = useUserQuery();

  if (!user?.premium) {
    return null;
  }

  return <>{children}</>;
};
