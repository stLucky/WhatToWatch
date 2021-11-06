import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Actions } from '../../types/actions';
import { incrementLimit } from '../../store/actions';
import { SHOWN_COUNT_FILMS } from '../../const';

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onIncrementLimit(offset: number) {
    dispatch(incrementLimit(offset));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function ShowMore({ onIncrementLimit }: PropsFromRedux): JSX.Element {
  const handleShowMoreClick = () => {
    onIncrementLimit(SHOWN_COUNT_FILMS);
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

export { ShowMore };

export default connector(ShowMore);
