import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';

const getUniqueKey = () => {
  const now = new Date().toDateString();
  return String(Date.parse(now)) + String(Math.random());
};

const TEASER_LAG = 1000;

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this._handleMovieCardHover = this._handleMovieCardHover.bind(this);
    this._handleMovieCardLeave = this._handleMovieCardLeave.bind(this);

    this._timerId = null;
  }

  _handleMovieCardHover(film) {
    this._timerId = setTimeout(() => {
      this.props.onActivateItem(film);
    }, TEASER_LAG);
  }

  _handleMovieCardLeave() {
    clearTimeout(this._timerId);
    this.props.onActivateItem(null);
  }

  componentWillUnmount() {
    clearTimeout(this._timerId);
  }

  render() {
    const {films, onMovieCardClick, activeItem} = this.props;
    return (
      <div className="catalog__movies-list">
        { films.map((film) => (
          <MovieCard
            key={ getUniqueKey() }
            film={ film }
            onMovieCardHover={this._handleMovieCardHover}
            onMovieCardLeave={this._handleMovieCardLeave}
            onMovieCardClick={onMovieCardClick}
            isHovered={activeItem === film}
          />
        )) }
      </div>
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.array.isRequired,
  onMovieCardClick: PropTypes.func.isRequired,
  activeItem: PropTypes.object,
  onActivateItem: PropTypes.func.isRequired,
};

export default MoviesList;
