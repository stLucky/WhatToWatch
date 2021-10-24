import Logo from '../logo/logo';

type FooterProps = {
  onMain?: boolean;
};

function Footer({ onMain = false }: FooterProps): JSX.Element {
  return (
    <footer className="page-footer">
      <Logo onMain={onMain} className="logo__link--light" />
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
