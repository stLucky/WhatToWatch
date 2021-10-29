import Films from '../components/films/films';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { FilmsType } from '../types/films';

type MyListProps = {
  films: FilmsType;
};

function MyListScreen({ films }: MyListProps): JSX.Element {
  return (
    <div className="user-page">
      <Header className="user-page__head" isAuthorizedUser>
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <Films films={films} hasPlayer />
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
