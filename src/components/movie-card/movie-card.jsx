import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from "../video-player/video-player.jsx";

const MovieCard = ({film, onMovieCardClick, onMovieCardHover, onMovieCardLeave, isHovered}) => {
  return (
    <article
      onMouseEnter={() => onMovieCardHover(film)}
      onMouseLeave={() => onMovieCardLeave()}
      onClick={(e) => {
        e.preventDefault();
        onMovieCardClick(film);
      }}
      className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        {isHovered ?
          <VideoPlayer src={film.trailerLink} posterURL={film.previewImage} isMuted={true} isAutoplay={true}/> :
          <img src={film.previewImage} alt={film.title} width="280" height="175"/>
        }
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
    trailerLink: PropTypes.string.isRequired,
  }).isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  onMovieCardHover: PropTypes.func.isRequired,
  onMovieCardLeave: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default MovieCard;
