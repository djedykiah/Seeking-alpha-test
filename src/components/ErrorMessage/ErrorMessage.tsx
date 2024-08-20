import { FC } from 'react';

type Props = {
  reason: string;
};

export const ErrorMessage: FC<Props> = ({ reason }) => (
  <>
    <p>Unable to fetch data. Try again in a few moments.</p>
    <p>Reason: {reason}</p>
  </>
);
