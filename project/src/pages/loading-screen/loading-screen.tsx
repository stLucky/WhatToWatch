import Loader from 'react-loader-spinner';
import styles from './loading-screen.module.scss';

const LOADER_WIDTH = 60;
const LOADER_HEIGHT = 60;

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.wrap} data-testid="loading">
      <Loader type="Oval" color="#eee5b5" height={LOADER_HEIGHT} width={LOADER_WIDTH} />
    </div>
  );
}

export default LoadingScreen;
