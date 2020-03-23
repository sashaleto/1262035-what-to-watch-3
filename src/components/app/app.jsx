import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeMovieId: null,
    };

    this._handlerMovieCardClick = this._handlerMovieCardClick.bind(this);
  }

  _handlerMovieCardClick(id) {
    this.setState({
      activeMovieId: id,
    });
  }

  _getSameGenreFilms(films, activeMovie) {
    return films.filter((film) => film.genre === activeMovie.genre).filter((film) => film.id !== activeMovie.id).slice(0, 4);
  }

  _renderMainScreen() {
    const {films, movieData} = this.props;
    const {activeMovieId} = this.state;

    if (activeMovieId !== null) {
      const activeMovie = films.find((movie) => movie.id === activeMovieId);

      return (<MoviePage
        movie={activeMovie}
        films={this._getSameGenreFilms(films, activeMovie)}
        onMovieCardClick={ this._handlerMovieCardClick }
      />);
    }

    return (
      <Main films={ films } movieData={ movieData } onMovieCardClick={ this._handlerMovieCardClick }/>
    );
  }

  render() {
    const {films} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage
              movie={films[0]}
              films={this._getSameGenreFilms(films, films[0])}
              onMovieCardClick={ this._handlerMovieCardClick }/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  films: PropTypes.array.isRequired,
  movieData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }),
};

export default App;
