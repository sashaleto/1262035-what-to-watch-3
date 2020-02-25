import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const movieData = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014,
};

const FILMS_TITLES = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

ReactDOM.render(
    <App
      filmsTitles={FILMS_TITLES} movieData={movieData}
    />,
    document.querySelector(`#root`)
);
