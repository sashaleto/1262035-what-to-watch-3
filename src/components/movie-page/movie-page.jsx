import React from 'react';
import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import Header from "../header/header.jsx";
import MoviePlayer from "../movie-player/movie-player.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import withVideo from "../../hocs/with-video/with-video";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../constants";

const MoviesListWrapped = withActiveItem(MoviesList);
const TabsWrapped = withActiveItem(Tabs);
const MoviePlayerWrapped = withVideo(MoviePlayer);

const MoviePage = (props) => {
  const {
    movie,
    films,
    onMovieCardClick,
    playingFilm,
    setPlayingFilm,
    userAvatarUrl,
    authStatus,
    addToMyList,
    removeFromMyList,
  } = props;

  return playingFilm
    ? (<MoviePlayerWrapped movie={playingFilm} onExitClick={() => setPlayingFilm(null)}/>)
    : (<React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header userAuthStatus={authStatus} userAvatarUrl={userAvatarUrl}/>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={() => setPlayingFilm(movie)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  (movie.isFavorite)
                    ? <button className="btn btn--list movie-card__button" type="button" onClick={() => removeFromMyList(movie.id)}>
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"/>
                      </svg>
                      <span>My list</span>
                    </button>
                    : <button className="btn btn--list movie-card__button" type="button" onClick={() => addToMyList(movie.id)}>
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"/>
                      </svg>
                      <span>My list</span>
                    </button>
                }
                <Link to={`${AppRoutes.FILM}/${movie.id}${AppRoutes.ADD_REVIEW}`} href="add-review.html" className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.posterImage} alt={`${movie.title} poster`}
                width="218"
                height="327"/>
            </div>

            <TabsWrapped movie={movie}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoviesListWrapped films={films} onMovieCardClick={onMovieCardClick}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>);
};

MoviePage.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    posterImage: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      score: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  films: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  setPlayingFilm: PropTypes.func.isRequired,
  playingFilm: PropTypes.object,
  userAvatarUrl: PropTypes.string.isRequired,
  authStatus: PropTypes.string.isRequired,
  addToMyList: PropTypes.func.isRequired,
  removeFromMyList: PropTypes.func.isRequired,
};

export default MoviePage;
