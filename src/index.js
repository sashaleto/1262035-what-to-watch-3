import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const MovieData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: 2014,
};

const FILMS_TITLES = [`Fantastic Beasts: The Crimes of Grindelwald`, `Bohemian Rhapsody`, `Macbeth`, `Aviator`];

ReactDOM.render(
    <App
      filmsTitles={FILMS_TITLES} title={MovieData.TITLE} genre={MovieData.GENRE} year={MovieData.YEAR}
    />,
    document.querySelector(`#root`)
);
