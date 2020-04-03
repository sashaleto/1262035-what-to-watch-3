import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import {ActionCreator} from "../../reducer";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderMainScreen() {
    const {films, heroMovie, onMovieCardClick, activeFilm, playingFilm, setPlayingFilm} = this.props;

    if (activeFilm !== null) {
      return (<MoviePage
        movie={activeFilm}
        films={films}
        onMovieCardClick={onMovieCardClick}
        playingFilm={playingFilm}
        setPlayingFilm={setPlayingFilm}
      />);
    }

    return (
      <Main
        heroMovie={heroMovie}
        onMovieCardClick={onMovieCardClick}
        playingFilm={playingFilm}
        setPlayingFilm={setPlayingFilm}
      />
    );
  }

  render() {
    const {films, onMovieCardClick, playingFilm, setPlayingFilm, heroMovie} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={heroMovie}
              films={films}
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
  films: PropTypes.array.isRequired,
  heroMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
  }),
  onMovieCardClick: PropTypes.func.isRequired,
  setPlayingFilm: PropTypes.func.isRequired,
  activeFilm: PropTypes.object,
  playingFilm: PropTypes.object,
};

const mapStateToProps = (state) => ({
  films: state.films,
  activeFilm: state.activeFilm,
  playingFilm: state.playingFilm,
});

const mapDispatchToProps = (dispatch) => ({
  onMovieCardClick(film) {
    dispatch(ActionCreator.setActiveFilm(film));
  },
  setPlayingFilm(film) {
    dispatch(ActionCreator.setPlayingFilm(film));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
