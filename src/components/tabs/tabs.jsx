import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {movieLevelMapper} from '../../utils';
import {MONTH_NAMES} from "../../constants";

const TabsTitles = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _setTabActiveClass(title) {
    const activeTab = this.props.activeItem || TabsTitles.OVERVIEW;
    return activeTab === title ? `movie-nav__item--active` : ``;
  }

  _handleTabClick(e, newActiveTab) {
    e.preventDefault();
    this.props.onActivateItem(newActiveTab);
  }

  _getCommentTemplate(comment) {
    const date = new Date(comment.date);
    const dateFormatted = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

    return <div key={comment.id} className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={comment.date}>{dateFormatted}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating}</div>
    </div>;
  }

  render() {
    const {movie, activeItem, comments} = this.props;
    const firstColumnCommentsLength = Math.ceil(comments.length / 2);

    const activeTab = activeItem || TabsTitles.OVERVIEW;

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            {Object.values(TabsTitles).map((title) => {
              return <li key={title} className={`movie-nav__item ${this._setTabActiveClass(title)}`}>
                <a href="#" className="movie-nav__link" onClick={(e) => {
                  this._handleTabClick(e, title);
                }}>{title}</a>
              </li>;
            })}
          </ul>
        </nav>

        {
          (activeTab === TabsTitles.OVERVIEW)
            ? <Fragment>
              <div className="movie-rating">
                <div className="movie-rating__score">{movie.rating.score}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">{movieLevelMapper(movie.rating.score)}</span>
                  <span className="movie-rating__count">{movie.rating.count} ratings</span>
                </p>
              </div>

              <div className="movie-card__text">
                <p>{movie.description}</p>

                <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

                <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)} and other</strong></p>
              </div>
            </Fragment>
            : null
        }

        {
          (activeTab === TabsTitles.DETAILS)
            ? <Fragment>
              <div className="movie-card__text movie-card__row">
                <div className="movie-card__text-col">
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Director</strong>
                    <span className="movie-card__details-value">{movie.director}</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Starring</strong>
                    <span className="movie-card__details-value">{movie.starring.join(`,\n`)}</span>
                  </p>
                </div>

                <div className="movie-card__text-col">
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Run Time</strong>
                    <span className="movie-card__details-value">1h 39m</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Genre</strong>
                    <span className="movie-card__details-value">{movie.genre}</span>
                  </p>
                  <p className="movie-card__details-item">
                    <strong className="movie-card__details-name">Released</strong>
                    <span className="movie-card__details-value">{movie.released}</span>
                  </p>
                </div>
              </div>
            </Fragment>
            : null
        }

        {
          (activeTab === TabsTitles.REVIEWS)
            ? <Fragment>
              <div className="movie-card__reviews movie-card__row">
                <div className="movie-card__reviews-col">
                  {comments.slice(0, firstColumnCommentsLength).map(this._getCommentTemplate)}
                </div>
                <div className="movie-card__reviews-col">
                  {comments.slice(firstColumnCommentsLength, comments.length).map(this._getCommentTemplate)}
                </div>
              </div>
            </Fragment>
            : null
        }
      </div>
    );
  }
}

Tabs.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  activeItem: PropTypes.string,
  onActivateItem: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Tabs;
