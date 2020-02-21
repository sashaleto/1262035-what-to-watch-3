import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const MovieData = {
  TITLE: `The Grand Budapest Hotel`,
  GENRE: `Drama`,
  YEAR: `2014`,
};

ReactDOM.render(
    <App
      title={MovieData.TITLE} genre={MovieData.GENRE} year={MovieData.YEAR}
    />,
    document.querySelector(`#root`)
);
