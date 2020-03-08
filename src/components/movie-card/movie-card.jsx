import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({film, onMovieCardClick, onMovieCardHover}) => {
  return (
    <article
      onMouseEnter={() => onMovieCardHover(film)}
      onClick={(e) => {
        e.preventDefault();
        onMovieCardClick(film.id);
      }}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={film.previewImage}
          alt={film.title} width="280" height="175"/>
      </div>
      <h3 className="small-movie-card__title">
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
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
};

export default MovieCard;
