import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = ({filmsTitles, title, genre, year}) => {
  return (
    <Main filmsTitles={filmsTitles} title={title} genre={genre} year={year}/>
  );
};

App.propTypes = {
  filmsTitles: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default App;
