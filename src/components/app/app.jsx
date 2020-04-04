import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import {ActionCreator as ActionCreatorState} from "../../reducer/state/state";
import {getActiveFilmId, getPlayingFilm, getShownCardsBound} from "../../reducer/state/selectors";
import {getFilms} from "../../reducer/data/selectors";
import {getMainFilms, getMoviePageFilms} from "../../reducer/data/selectors";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderMainScreen() {
    const {
      mainFilms,
      moviePageFilms,
      heroMovie,
      onMovieCardClick,
      activeFilm,
      playingFilm,
      setPlayingFilm,
      onShowMoreClick,
      shownCardsBound
    } = this.props;

    if (typeof activeFilm !== `undefined`) {
      return (<MoviePage
        movie={activeFilm}
        films={moviePageFilms}
        onMovieCardClick={onMovieCardClick}
        playingFilm={playingFilm}
        setPlayingFilm={setPlayingFilm}
      />);
    }

    return (
      <Main
        films={mainFilms}
        heroMovie={heroMovie}
        onMovieCardClick={onMovieCardClick}
        onShowMoreClick={onShowMoreClick}
        shownCardsBound={shownCardsBound}
        playingFilm={playingFilm}
        setPlayingFilm={setPlayingFilm}
      />
    );
  }

  render() {
    const {moviePageFilms, onMovieCardClick, playingFilm, setPlayingFilm, heroMovie} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={heroMovie}
              films={moviePageFilms}
              onMovieCardClick={onMovieCardClick}
              playingFilm={playingFilm}
              setPlayingFilm={setPlayingFilm}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  mainFilms: PropTypes.array.isRequired,
  moviePageFilms: PropTypes.array.isRequired,
  heroMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
  }),
  onMovieCardClick: PropTypes.func.isRequired,
  setPlayingFilm: PropTypes.func.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
  shownCardsBound: PropTypes.number.isRequired,
  activeFilm: PropTypes.object,
  playingFilm: PropTypes.object,
};

const mapStateToProps = (state) => ({
  mainFilms: getMainFilms(state),
  moviePageFilms: getMoviePageFilms(state),
  shownCardsBound: getShownCardsBound(state),
  activeFilm: getFilms(state)[getActiveFilmId(state)],
  playingFilm: getPlayingFilm(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(filmId) {
    dispatch(ActionCreatorState.setActiveFilm(filmId));
  },
  setPlayingFilm(film) {
    dispatch(ActionCreatorState.setPlayingFilm(film));
  },
  onShowMoreClick() {
    dispatch(ActionCreatorState.expandCardsBound());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
