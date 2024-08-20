import { lazy, Suspense } from 'react';

import { Loader } from './components/Loader';
import { Premium } from './components/Premium';
import { useUserQuery } from './api';
import styles from './App.module.css';

const RatingsSummary = lazy(() =>
  import('./components/RatingsSummary').then((module) => ({
    default: module.RatingsSummary,
  })),
);

const FactorGrades = lazy(() =>
  import('./components/FactorGrades').then((module) => ({
    default: module.FactorGrades,
  })),
);

const QuantRanking = lazy(() =>
  import('./components/QuantRanking').then((module) => ({
    default: module.QuantRanking,
  })),
);

function App() {
  const { isLoading } = useUserQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Suspense fallback={<div>Loading ratings summary...</div>}>
        <Premium>
          <RatingsSummary />
        </Premium>
      </Suspense>
      <Suspense fallback={<div>Loading factor grades...</div>}>
        <Premium>
          <FactorGrades />
        </Premium>
      </Suspense>
      <Suspense fallback={<div>Loading quant ranking...</div>}>
        <QuantRanking />
      </Suspense>
    </div>
  );
}

export default App;
