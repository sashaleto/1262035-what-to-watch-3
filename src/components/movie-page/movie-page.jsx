import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Tabs from "../tabs/tabs.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import Header from "../header/header.jsx";
import withActiveItem from "../../hocs/with-active-item/with-active-item";
import {Link} from "react-router-dom";
import {AppRoutes} from "../../constants";
import {AuthorizationStatus} from "../../reducer/user/user";
import {connect} from "react-redux";
import {getCurrentComments, getFilms, getMoviePageFilms} from "../../reducer/data/selectors";
import {getActiveFilmId} from "../../reducer/state/selectors";
import {ActionCreator as ActionCreatorState} from "../../reducer/state/state";
import {Operation as DataOperation} from "../../reducer/data/data";
import history from "../../history";

const MoviesListWrapped = withActiveItem(MoviesList);
const TabsWrapped = withActiveItem(Tabs);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadComments, setActiveFilm, movieId} = this.props;
    loadComments(movieId);
    setActiveFilm(movieId);
  }

  componentDidUpdate() {
    const {activeFilmId, loadComments, setActiveFilm, movieId} = this.props;
    if (activeFilmId !== movieId) {
      loadComments(movieId);
      setActiveFilm(movieId);
    }
  }

  render() {
    const {
      movie,
      comments,
      filmsToRender,
      userAvatarUrl,
      authStatus,
      addToMyList,
      removeFromMyList,
    } = this.props;

    return (
      (movie)
        ? <React.Fragment>
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
                    <button className="btn btn--play movie-card__button" type="button"
                      onClick={() => {
                        history.push(`${AppRoutes.PLAYER}/${movie.id}`);
                      }}>
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
                    {
                      (authStatus === AuthorizationStatus.AUTH)
                        ? <Link to={`${AppRoutes.FILM}/${movie.id}${AppRoutes.ADD_REVIEW}`} className="btn movie-card__button">Add review</Link>
                        : null
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="movie-card__wrap movie-card__translate-top">
              <div className="movie-card__info">
                <div className="movie-card__poster movie-card__poster--big">
                  <img src={movie.posterImage} alt={`${movie.title} poster`} width="218" height="327"/>
                </div>

                <TabsWrapped movie={movie} comments={comments}/>
              </div>
            </div>
          </section>

          <div className="page-content">
            <section className="catalog catalog--like-this">
              <h2 className="catalog__title">More like this</h2>

              <MoviesListWrapped films={filmsToRender}/>
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
        : null
    );
  }
}

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
  }),
  movieId: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
  authStatus: PropTypes.string.isRequired,
  addToMyList: PropTypes.func.isRequired,
  removeFromMyList: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  setActiveFilm: PropTypes.func.isRequired,
  activeFilmId: PropTypes.number.isRequired,
  filmsToRender: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  movie: getFilms(state)[getActiveFilmId(state)],
  comments: getCurrentComments(state),
  activeFilmId: getActiveFilmId(state),
  filmsToRender: getMoviePageFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToMyList(filmId) {
    dispatch(DataOperation.addFilmToUserList(filmId));
  },
  removeFromMyList(filmId) {
    dispatch(DataOperation.removeFilmFromUserList(filmId));
  },
  loadComments(filmId) {
    dispatch(DataOperation.getCommentsToFilm(filmId));
  },
  setActiveFilm(filmId) {
    dispatch(ActionCreatorState.setActiveFilm(filmId));
  },
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
