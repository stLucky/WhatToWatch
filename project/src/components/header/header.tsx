import { ReactNode } from 'react';
import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

type HeaderProps = {
  className?: string;
  children?: ReactNode;
  isAuthorizedUser?: boolean;
  isSignInPage?: boolean;
  onMain?: boolean;
};

function Header({
  className = '',
  children,
  isAuthorizedUser = false,
  isSignInPage = false,
  onMain = false,
}: HeaderProps): JSX.Element {
  return (
    <header className={`page-header ${className}`}>
      <Logo onMain={onMain}/>
      {children}
      {!isSignInPage && <UserMenu isAuthorized={isAuthorizedUser} />}
    </header>
  );
}

export default Header;
