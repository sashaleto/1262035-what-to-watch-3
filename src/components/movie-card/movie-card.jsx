import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from "../video-player/video-player.jsx";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../constants";

const MovieCard = ({film, onMovieCardHover, onMovieCardLeave, isHovered}) => {
  return (
    <article
      onMouseEnter={() => onMovieCardHover(film)}
      onMouseLeave={() => onMovieCardLeave()}
      className="small-movie-card catalog__movies-card">
      <Link to={`${AppRoutes.FILM}/${film.id}`}>
        <div className="small-movie-card__image">
          {isHovered ?
            <VideoPlayer src={film.trailerLink} posterURL={film.previewImage} isMuted={true} isAutoplay={true}/> :
            <img src={film.previewImage} alt={film.title} width="280" height="175"/>
          }
        </div>
      </Link>
      <h3 className="small-movie-card__title">
        <Link to={`${AppRoutes.FILM}/${film.id}`} className="small-movie-card__link">{film.title}</Link>
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
  onMovieCardHover: PropTypes.func.isRequired,
  onMovieCardLeave: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
};

export default MovieCard;
