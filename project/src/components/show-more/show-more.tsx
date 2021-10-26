import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Actions } from '../../types/action';
import { incrementCounter } from '../../store/action';

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onIncrementCounter() {
    dispatch(incrementCounter());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function ShowMore({ onIncrementCounter }: PropsFromRedux): JSX.Element {
  const handleShowMoreClick = () => {
    onIncrementCounter();
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
