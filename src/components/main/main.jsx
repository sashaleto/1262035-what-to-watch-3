import React from 'react';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list/movies-list.jsx';
import GenresList from "../genres-list/genres-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import Header from "../header/header.jsx";
import history from "../../history";
import {AppRoutes} from "../../constants";
import {Link} from "react-router-dom";

const MoviesListWrapped = withActiveItem(MoviesList);

const Main = (props) => {
  const {
    films,
    heroMovie,
    shownCardsBound,
    onShowMoreClick,
    userAvatarUrl,
    authStatus,
    addToMyList,
    removeFromMyList,
  } = props;
  const filmsToRender = films.slice(0, shownCardsBound);

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={`${heroMovie.backgroundImage}`} alt={heroMovie.title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header userAuthStatus={authStatus} userAvatarUrl={userAvatarUrl}/>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={`${heroMovie.posterImage}`} alt={heroMovie.title} width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{heroMovie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{heroMovie.genre}</span>
                <span className="movie-card__year">{heroMovie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button"
                  onClick={() => {
                    history.push(`${AppRoutes.PLAYER}/${heroMovie.id}`);
                  }}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  (heroMovie.isFavorite)
                    ? <button className="btn btn--list movie-card__button" type="button" onClick={() => removeFromMyList(heroMovie.id)}>
                      <svg viewBox="0 0 18 14" width="18" height="14">
                        <use xlinkHref="#in-list"/>
                      </svg>
                      <span>My list</span>
                    </button>
                    : <button className="btn btn--list movie-card__button" type="button" onClick={() => addToMyList(heroMovie.id)}>
                      <svg viewBox="0 0 19 20" width="19" height="20">
                        <use xlinkHref="#add"/>
                      </svg>
                      <span>My list</span>
                    </button>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList/>

          <MoviesListWrapped films={filmsToRender}/>

          {
            (films.length > shownCardsBound)
              ? <ShowMore onShowMoreClick={onShowMoreClick}/>
              : null
          }

        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoutes.ROOT} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

Main.propTypes = {
  films: PropTypes.array.isRequired,
  heroMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }),
  onShowMoreClick: PropTypes.func.isRequired,
  shownCardsBound: PropTypes.number.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
  authStatus: PropTypes.string.isRequired,
  addToMyList: PropTypes.func.isRequired,
  removeFromMyList: PropTypes.func.isRequired,
};

export default Main;
