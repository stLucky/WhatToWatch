import { Link } from 'react-router-dom';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';

function Screen404(): JSX.Element {
  return (
    <div className="user-page">
      <Header pathLogo="main.html" className="user-page__head"></Header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'center',
          flexGrow: 1,
          alignItems: 'center',
        }}
      >
        <p style={{ fontSize: '60px', lineHeight: '60px' }}>404 Not Found</p>

        <Link to="/" style={{ fontSize: '30px', lineHeight: '40px' }}>
          Go back to the main page
        </Link>
      </div>

      <Footer path="main.html" />
    </div>
  );
}

export default Screen404;
