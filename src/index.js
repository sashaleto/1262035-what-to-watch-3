import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const MovieData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014,
};

const FILMS_TITLES = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

const movieDataAdapter = (movieData) => {
  return {
    title: movieData.TITLE,
    genre: movieData.GENRE,
    year: movieData.YEAR
  };
};

ReactDOM.render(
    <App
      filmsTitles={FILMS_TITLES} movieData={movieDataAdapter(MovieData)}
    />,
    document.querySelector(`#root`)
);
