import {useDispatch} from 'react-redux';
import { incrementLimit } from '../../store/actions';
import { SHOWN_COUNT_FILMS } from '../../const';


function ShowMore(): JSX.Element {
  const dispatch = useDispatch();

  const handleShowMoreClick = () => {
    dispatch(incrementLimit(SHOWN_COUNT_FILMS));
  };

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={handleShowMoreClick}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMore;
