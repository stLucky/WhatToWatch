import Header from '../../header/header';

function HeadGuestScreen(): JSX.Element {
  return (
    <section className="film-card">
      <div className="film-card__bg">

        <img src="img/bg-header.jpg" />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <Header/>
    </section>
  );
}

export default HeadGuestScreen;
