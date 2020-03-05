import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {films} from './mocks/films';
import {movieInfo} from './mocks/full-page-movie';

const movieData = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

ReactDOM.render(
    <App
      films={films} movieData={movieData} movieInfo={movieInfo}
    />,
    document.querySelector(`#root`)
);
