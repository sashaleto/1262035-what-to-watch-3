import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';

const getUniqueKey = () => {
  const now = new Date().toDateString();
  return String(Date.parse(now)) + String(Math.random());
};

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {activeCard: null};
    this._handleMovieCardHover = this._handleMovieCardHover.bind(this);
  }

  _handleMovieCardHover(film) {
    this.setState({activeCard: film});
  }

  render() {
    const {films, onFilmTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        { films.map((film) => (
          <MovieCard
            key={ getUniqueKey() }
            film={ film }
            onMovieCardHover={this._handleMovieCardHover}
            onFilmTitleClick={onFilmTitleClick}
          />
        )) }
      </div>
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.array.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
