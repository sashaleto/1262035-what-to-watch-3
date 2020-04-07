import React from 'react';
import PropTypes from 'prop-types';
import MoviesList from "../movies-list/movies-list.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../constants";

const MoviesListWrapped = withActiveItem(MoviesList);

const MyList = ({films, onMovieCardClick, avatarUrl}) => {

  return <div className="user-page">
    <header className="page-header user-page__head">
      <div className="logo">
        <Link to={AppRoutes.ROOT} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <h1 className="page-title user-page__title">My list</h1>

      <div className="user-block">
        <div className="user-block__avatar">
          <img src={avatarUrl} alt="User avatar" width="63" height="63"/>
        </div>
      </div>
    </header>

    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <MoviesListWrapped films={films} onMovieCardClick={onMovieCardClick}/>
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
  </div>;
};

MyList.propTypes = {
  films: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default MyList;
