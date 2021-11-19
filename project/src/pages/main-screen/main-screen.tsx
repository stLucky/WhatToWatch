import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Promo from '../../components/promo/promo';
import Films from '../../components/films/films';
import Footer from '../../components/footer/footer';
import Genres from '../../components/genres/genres';
import Header from '../../components/header/header';
import ShowMore from '../../components/show-more/show-more';
import { SHOWN_COUNT_FILMS } from '../../const';
import { resetLimit } from '../../store/actions';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorScreen from '../error-screen/error-screen';
import {
  getFilteredFilms,
  getGenres,
  getRenderedFilms
} from '../../store/films/selectors';
import {
  getErrorFilmsStatus,
  getLoadingFilmsStatus
} from '../../store/films/selectors';
import { fetchPromoAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';
import { getLoadingPromoStatus } from '../../store/promo/selectors';

function MainScreen(): JSX.Element {
  const genres = useSelector(getGenres);
  const filteredFilms = useSelector(getFilteredFilms);
  const renderedFilms = useSelector(getRenderedFilms);
  const isFilmsLoading = useSelector(getLoadingFilmsStatus);
  const isPromoLoading = useSelector(getLoadingPromoStatus);
  const isFilmsError = useSelector(getErrorFilmsStatus);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const dispatch = useDispatch();

  const isShowMoreVisible =
    filteredFilms.length > SHOWN_COUNT_FILMS &&
    filteredFilms.length !== renderedFilms.length;

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, [dispatch, authorizationStatus]);

  useEffect(() => {
    dispatch(resetLimit());
  }, [dispatch]);

  if (isFilmsLoading && isPromoLoading) {
    return <LoadingScreen />;
  }

  if (isFilmsError) {
    return <ErrorScreen />;
  }

  return (
    <>
      <Promo>
        <Header className="film-card__head" onMain />
      </Promo>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <Genres genres={genres} />
          <Films films={renderedFilms} hasPlayer />
          {isShowMoreVisible && <ShowMore />}
        </section>
        <Footer onMain />
      </div>
    </>
  );
}

export default MainScreen;
