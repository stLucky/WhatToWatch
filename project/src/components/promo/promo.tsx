import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  getErrorPromoStatus,
  getPromo
} from '../../store/films/selectors';
import Controls from '../controls/controls';

type PromoFilm = {
  children?: JSX.Element;
};

function Promo({ children }: PromoFilm): JSX.Element {
  const promo = useSelector(getPromo);
  const isPromoError = useSelector(getErrorPromoStatus);

  if (isPromoError) {
    return (
      <section className="film-card">
        <div className="film-card__bg"></div>
        <h1 className="visually-hidden">WTW</h1>
        {children}
      </section>
    );
  }

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promo.backgroundImage} alt={promo.name} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      {children}
      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img
              src={promo.posterImage}
              alt={promo.name}
              width="218"
              height="327"
            />
          </div>
          <div className="film-card__desc">
            <h2 className="film-card__title">{promo.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{promo.genre}</span>
              <span className="film-card__year">{promo.released}</span>
            </p>
            <Controls />
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Promo);
//TODO обертка мемо не убирает лишнюю перерисовку при смене жанра, не пойму почему
