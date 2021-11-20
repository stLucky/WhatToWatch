import { MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { logoutAction } from '../../store/user/api-actions';
import {
  getAuthorizationStatus,
  getUser
} from '../../store/user/selectors';

function UserMenu(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleLogoutClick = (evt: MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to={AppRoute.MyList}>
              <img
                src={user.avatarUrl}
                alt="User avatar"
                width="63"
                height="63"
              />
            </Link>
          </div>
        </li>
        <li className="user-block__item">
          <Link
            to={AppRoute.Root}
            onClick={handleLogoutClick}
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
