import { PropsWithChildren } from 'react';
import cn from 'classnames';
import Logo from '../logo/logo';
import UserMenu from '../user-menu/user-menu';

type HeaderProps = PropsWithChildren<{
  className?: string;
  isAuthorizedUser?: boolean;
  isVisibleUserMenu?: boolean;
  onMain?: boolean;
}>;

function Header({
  className = '',
  children,
  isVisibleUserMenu = true,
  onMain = false,
}: HeaderProps): JSX.Element {
  const headerClasses = cn('page-header', `${className}`);

  return (
    <header className={headerClasses}>
      <Logo onMain={onMain} />
      {children}
      {isVisibleUserMenu && <UserMenu />}
    </header>
  );
}

export default Header;
