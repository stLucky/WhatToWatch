import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  promoFilmInfo: {
    title: string,
    genre: string,
    releaseDate: number
  }
}

function App({ promoFilmInfo }: AppScreenProps): JSX.Element {

  return <MainScreen promoFilmInfo={promoFilmInfo}/>;
}

export default App;
