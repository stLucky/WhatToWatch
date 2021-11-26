import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayerScreen from './player-screen';
import { makeFakeFilms } from '../../mocks/films';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../store/root-reducer';
import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import { Store } from 'redux';

const fakeFilms = makeFakeFilms();
const fakeFilm = fakeFilms[0];
const fakeId = fakeFilm.id.toString();

const mockStore = configureMockStore();
let store: Store;

describe('Component: PlayerScreen', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: fakeId });
    window.HTMLVideoElement.prototype.pause = jest.fn();
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.requestFullscreen = jest.fn();
  });

  it('should render correctly', () => {
    store = mockStore({
      [NameSpace.Films]: { films: fakeFilms },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button', {name: /exit/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /play/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /full screen/i})).toBeInTheDocument();
    expect(screen.getByTestId('video-player')).toBeInTheDocument();

    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.queryByTestId(/loading/i)).toBeNull();

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);
  });


  it('should render correctly when films are missing', () => {
    store = mockStore({
      [NameSpace.Films]: { films: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('button', {name: /exit/i})).toBeNull();
    expect(screen.queryByRole('button', {name: /play/i})).toBeNull();
    expect(screen.queryByRole('button', {name: /full screen/i})).toBeNull();
    expect(screen.queryByTestId('video-player')).toBeNull();

    expect(screen.queryByTestId('error-page')).toBeNull();
    expect(screen.getByTestId(/loading/i)).toBeInTheDocument();

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(0);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);
  });


  it('should render correctly when current film is not find', () => {
    store = mockStore({
      [NameSpace.Films]: { films: fakeFilms },
    });

    const useParams = jest.spyOn(ReactRouter, 'useParams');
    useParams.mockReturnValue({id: 'fake'});

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.queryByRole('button', {name: /exit/i})).toBeNull();
    expect(screen.queryByRole('button', {name: /play/i})).toBeNull();
    expect(screen.queryByRole('button', {name: /full screen/i})).toBeNull();
    expect(screen.queryByTestId('video-player')).toBeNull();

    expect(screen.getByTestId('error-page')).toBeInTheDocument();
    expect(screen.queryByTestId(/loading/i)).toBeNull();

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(0);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);
  });

  it('should play video when data is loaded', () => {
    store = mockStore({
      [NameSpace.Films]: { films: fakeFilms },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);

    fireEvent.loadedData(screen.getByTestId('video-player'));

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);
  });

  it('should handle pause button correctly', () => {
    store = mockStore({
      [NameSpace.Films]: { films: fakeFilms },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerScreen />
        </MemoryRouter>
      </Provider>,
    );

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);

    fireEvent.loadedData(screen.getByTestId('video-player') as HTMLVideoElement);

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByRole('button', {name: /pause/i}));

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(2);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);
  });
});
