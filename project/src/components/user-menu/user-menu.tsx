import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';

function UserMenu(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

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

              dispatch(logoutAction());
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

export default UserMenu;
