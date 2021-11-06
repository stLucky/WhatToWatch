import Loader from 'react-loader-spinner';
import styles from './loading-screen.module.scss';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.wrap}>
      <Loader type="Oval" color="#eee5b5" height={60} width={60} />
    </div>
  );
}

export default LoadingScreen;
