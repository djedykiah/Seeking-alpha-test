import { FactorGrades } from './components/FactorGrades';
import { Premium } from './components/Premium';
import { QuantRanking } from './components/QuantRanking';
import { RatingsSummary } from './components/RatingsSummary';
import styles from './App.module.css';

function App() {
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
