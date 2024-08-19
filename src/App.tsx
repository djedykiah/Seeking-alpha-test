import { useUserQuery } from './api';
import styles from './App.module.css';
import {
  FactorGrades,
  Loader,
  Premium,
  QuantRanking,
  RatingsSummary,
} from './components';

function App() {
  const { isLoading } = useUserQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <Premium>
        <RatingsSummary />
      </Premium>
      <Premium>
        <FactorGrades />
      </Premium>
      <QuantRanking />
    </div>
  );
}

export default App;
