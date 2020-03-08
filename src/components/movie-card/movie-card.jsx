import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({film, onFilmTitleClick, onMovieCardHover}) => {
  return (
    <article onMouseEnter={() => onMovieCardHover(film)} className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={film.previewImage}
          alt={film.title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title" onClick={() => onFilmTitleClick()}>
        <a className="small-movie-card__link" href="movie-page.html">{film.title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
};

export default MovieCard;
