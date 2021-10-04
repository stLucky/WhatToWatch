import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const Setting= {
  PromoFilmInfo: {
    title: 'The Grand Budapest Hotel',
    genre: 'Drama',
    releaseDate: 2014,
  },
};

ReactDOM.render(
  <React.StrictMode>
    <App promoFilmInfo={Setting.PromoFilmInfo}/>
  </React.StrictMode>,
  document.getElementById('root'));
