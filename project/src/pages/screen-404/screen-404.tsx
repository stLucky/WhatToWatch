import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import styles from './screen-404.module.scss';

function Screen404(): JSX.Element {
  return (
    <div className="user-page">
      <Header className={`user-page__head ${styles['header']}`}></Header>
      <div className={styles['main-layout']}>
        <p className={styles.text}>404 Not Found</p>
        <Link to={AppRoute.Root} className={styles.link}>
          Go back to the main page
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Screen404;
