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
    const {films, onMovieCardClick} = this.props;
    return (
      <div className="catalog__movies-list">
        { films.map((film) => (
          <MovieCard
            key={ getUniqueKey() }
            film={ film }
            onMovieCardHover={this._handleMovieCardHover}
            onMovieCardClick={onMovieCardClick}
          />
        )) }
      </div>
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
};

export default MoviesList;
