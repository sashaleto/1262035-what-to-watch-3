import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const onFilmTitleClick = () => {};

const App = ({films, movieData}) => {
  return (
    <Main films={films} movieData={movieData} onFilmTitleClick={onFilmTitleClick}/>
  );
};

App.propTypes = {
  films: PropTypes.array.isRequired,
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  })
};

export default App;
