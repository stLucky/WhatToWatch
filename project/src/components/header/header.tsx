import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

type HeaderProps = {
  pathLogo?: string;
  className?: string;
  children?: JSX.Element;
  isAuthorizedUser?: boolean;
  isSignInPage?: boolean;
};

function Header({
  pathLogo,
  className = '',
  children,
  isAuthorizedUser = false,
  isSignInPage = false,
}: HeaderProps): JSX.Element {
  return (
    <header className={`page-header ${className}`}>
      <Logo path={pathLogo} />
      {children}
      {!isSignInPage && <UserMenu isAuthorized={isAuthorizedUser} />}
    </header>
  );
}

export default Header;
