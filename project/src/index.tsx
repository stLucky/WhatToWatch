import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import App from './components/app/app';
import { rootReducer } from './store/root-reducer';
import { requireAuthorization } from './store/actions';
import { AuthorizationStatus } from './const';
import { redirect } from './store/middlewares/redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { checkAuthAction } from './store/user/api-actions';
import { fetchFilmsAction } from './store/films/api-actions';

const api = createAPI(() =>
  store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

(store.dispatch)(checkAuthAction());
(store.dispatch)(fetchFilmsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
