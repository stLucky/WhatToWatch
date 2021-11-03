import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import App from './components/app/app';
import { reducer } from './store/reducer';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions';
import { requireAuthorization } from './store/actions';
import { AuthorizationStatus } from './const';
import { ThunkAppDispatch } from './types/actions';


const Setting = {
  PromoFilmInfo: {
    title: 'The Grand Budapest Hotel',
    genre: 'Drama',
    releaseDate: 2014,
  },
};

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchFilmsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App promoFilmInfo={Setting.PromoFilmInfo} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
