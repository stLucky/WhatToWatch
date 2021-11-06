// import {MouseEvent} from 'react';
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import styles from './error-screen.module.scss';

type ErrorScreenProps = {
  type?: string
}

function ErrorScreen ({ type = '' }: ErrorScreenProps): JSX.Element {
  const headerClasses = cn('user-page__head', styles.header);

  const refreshPage = (evt: MouseEvent) => {
    evt.preventDefault();
    window.location.reload();
  };

  return (
    <div className='user-page'>
      <Header className={headerClasses} isVisibleUserMenu={false}></Header>
      <div className={styles['main-layout']}>
        {type === '404' ? (
          <>
            <p className={styles.text}>404 Not Found</p>
            <Link to={AppRoute.Root} className={styles.link}>
              Go back to the main page
            </Link>
          </>
        ) : (
          <>
            <p className={styles.text}>
              Oops... Something went wrong. Try again
            </p>
            <Link
              to={AppRoute.Root}
              className={styles.link}
              onClick={refreshPage}
            >
              Reload page
            </Link>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ErrorScreen;
