import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { State } from '../../types/state';
import { AuthorizationStatus, AppRoute } from '../../const';
import { ThunkAppDispatch } from '../../types/actions';
import { logoutAction } from '../../store/api-actions';

const mapStateToProps = ({ authorizationStatus, user }: State) => ({
  authorizationStatus,
  user,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function UserMenu({
  authorizationStatus,
  user,
  logout,
}: PropsFromRedux): JSX.Element {
  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link
            to="/"
            onClick={(evt) => {
              evt.preventDefault();

              logout();
            }}
            className="user-block__link"
          >
            Sign out
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">
        Sign in
      </Link>
    </div>
  );
}

export { UserMenu };

export default connector(UserMenu);
