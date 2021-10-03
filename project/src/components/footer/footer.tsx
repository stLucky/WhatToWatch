import Logo from '../logo/logo';

type FooterProps = {
  path?: string
}

function Footer({path}: FooterProps): JSX.Element{
  return (
    <footer className="page-footer">
      <Logo path={path ? path : undefined} className="logo__link--light"/>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
