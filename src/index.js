import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {films} from './mocks/films';

const movieData = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

ReactDOM.render(
    <App
      films={films} movieData={movieData}
    />,
    document.querySelector(`#root`)
);
