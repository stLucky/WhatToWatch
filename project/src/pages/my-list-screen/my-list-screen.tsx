import cn from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Films from '../../components/films/films';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { fetchMyListAction } from '../../store/api-actions';
import {
  getErrorMyListStatus,
  getLoadingMyListStatus,
  getMyList
} from '../../store/films-data/selectors';
import ErrorScreen from '../error-screen/error-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import styles from './my-list-screen.module.scss';

function MyListScreen(): JSX.Element {
  const myList = useSelector(getMyList);
  const isMyListLoading = useSelector(getLoadingMyListStatus);
  const isMyListError = useSelector(getErrorMyListStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyListAction());
  }, [dispatch]);

  const titleClasses = cn('page-title user-page__title', styles.title);

  if (isMyListLoading) {
    return <LoadingScreen />;
  }

  if (isMyListError) {
    return <ErrorScreen />;
  }
  // TODO на страницах с приватным маршрутом (my-list and add-review) если сделать перезагрузку страницы то выкидывает на главную через редирект logina

  return (
    <div className="user-page">
      <Header className="user-page__head" isAuthorizedUser>
        <h1 className={titleClasses}>My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {myList.length ? (
          <Films films={myList} hasPlayer />
        ) : (
          <p className={styles.noContentWrap}>
            You have not added any movies yet
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
