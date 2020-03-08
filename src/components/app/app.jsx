import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

const onFilmTitleClick = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {films, movieData, movieInfo} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main films={ films } movieData={ movieData } onFilmTitleClick={ onFilmTitleClick }/>
          </Route>
          <Route exact path="/movie-page">
            <MoviePage movie={ films[0] }/>
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
