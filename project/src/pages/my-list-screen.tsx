import FilmsList from '../components/films-list/films-list';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { AppRoute } from '../const';
import { Films } from '../types/films';

type MyListProps = {
  films: Films
};

function MyListScreen({ films }: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <Header pathLogo={AppRoute.Root} className="user-page__head" isAuthorizedUser>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={films}/>
      </section>

      <Footer path={AppRoute.Root} />
    </div>
  );
}

export default MyListScreen;
