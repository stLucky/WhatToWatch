import { memo, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AuthorizationStatus, FavoriteStatus } from '../../const';
import { fetchFavoriteStatusAction } from '../../store/api-actions';
import { getFilm, getPromo } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type ControlsProps = {
  hasReviewControl?: boolean;
};

function Controls({ hasReviewControl = false }: ControlsProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const promo = useSelector(getPromo);
  const film = useSelector(getFilm);

  const { id }: { id: string } = useParams();
  const currentId = id || promo.id?.toString();
  const currentFavoriteStatus = id ? film.isFavorite : promo.isFavorite;

  const dispatch = useDispatch();
  const history = useHistory();

  const handlePlayClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    history.push(`/player/${currentId}`);
  };

  const handleMyListClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    currentFavoriteStatus
      ? dispatch(fetchFavoriteStatusAction(currentId, FavoriteStatus.Off))
      : dispatch(fetchFavoriteStatusAction(currentId, FavoriteStatus.On));
  };

  const isVisibleReviewControl =
    hasReviewControl && authorizationStatus === AuthorizationStatus.Auth;
  return (
    <div className="film-card__buttons">
      <button
        className="btn btn--play film-card__button"
        type="button"
        onClick={handlePlayClick}
      >
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </button>
      <button
        className="btn btn--list film-card__button"
        type="button"
        onClick={handleMyListClick}
      >
        {currentFavoriteStatus ? (
          <svg viewBox="0 0 18 14" width="18" height="14">
            <use xlinkHref="#in-list" />
          </svg>
        ) : (
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add" />
          </svg>
        )}
        <span>My list</span>
      </button>
      {isVisibleReviewControl && (
        <Link to={`/films/${id}/review`} className="btn film-card__button">
          Add review
        </Link>
      )}
    </div>
  );
}

export default memo(Controls);
