import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const onFilmTitleClick = () => {};

const App = ({filmsTitles, movieData}) => {
  return (
    <Main filmsTitles={filmsTitles} movieData={movieData} onFilmTitleClick={onFilmTitleClick}/>
  );
};

App.propTypes = {
  filmsTitles: PropTypes.array.isRequired,
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  })
};

export default App;
