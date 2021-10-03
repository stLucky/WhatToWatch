type UserMenuProps = {
  isAuthorized: boolean
}

function UserMenu({isAuthorized}: UserMenuProps): JSX.Element {
  return (
    <ul className="user-block">
      {isAuthorized ?
        <>
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            <a className="user-block__link">Sign out</a>
          </li>
        </>
        : <a href="sign-in.html" className="user-block__link">Sign in</a>}
    </ul>
  );
}

export default UserMenu;
