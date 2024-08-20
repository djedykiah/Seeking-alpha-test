import { lazy, Suspense } from 'react';

import { FactorGradesLoader } from './components/FactorGrades/FactorGradesLoader';
import { Loader } from './components/Loader';
import { Premium } from './components/Premium';
import { QuantRankingLoader } from './components/QuantRanking/QuantRankingLoader';
import { RatingsSummaryLoader } from './components/RatingsSummary/RatingsSummaryLoader';
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
      <Suspense fallback={<RatingsSummaryLoader />}>
        <Premium>
          <RatingsSummary />
        </Premium>
      </Suspense>
      <Suspense fallback={<FactorGradesLoader />}>
        <Premium>
          <FactorGrades />
        </Premium>
      </Suspense>
      <Suspense fallback={<QuantRankingLoader />}>
        <QuantRanking />
      </Suspense>
    </div>
  );
}

export default App;
