import FilmsList from '../components/films-list/films-list';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { Films } from '../types/films';

type MyListProps = {
  films: Films
};

function MyListScreen({ films }: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <Header className="user-page__head" isAuthorizedUser>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={films} hasPlayer/>
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
