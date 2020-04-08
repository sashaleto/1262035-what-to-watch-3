import React, {Fragment, PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {AppRoutes} from "../../constants";

const MAX_RATING = 5;
const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

class AddReviewPage extends PureComponent {
  constructor(props) {
    super(props);

    this.form = createRef();
    this.reviewTextarea = createRef();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.toggleFormDisabledState = this.toggleFormDisabledState.bind(this);
  }

  toggleFormDisabledState() {
    this.form.current.rating.forEach((node) => {
      node.disabled = !node.disabled;
    });
    this.reviewTextarea.current.disabled = !this.reviewTextarea.current.disabled;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    this.toggleFormDisabledState();
    const filmId = this.props.movie.id;
    this.props.submitReviewHandler(filmId, {
      rating: this.form.current.rating.value,
      comment: this.reviewTextarea.current.value,
    });
  }

  handleReviewChange(e) {
    const comment = e.target.value;
    if (comment.length > MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH) {
      this.props.onValidateForm(true);
    }
  }

  componentDidUpdate() {
    if (this.props.apiError) {
      this.toggleFormDisabledState();
    }
  }

  render() {
    const {movie, userAvatarUrl, apiError} = this.props;
    const isFormValid = this.props.validationStatus;
    const {title, backgroundImage, posterImage, id} = movie;
    return <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoutes.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoutes.FILM}/${id}`} className="breadcrumbs__link">{title}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <div className="user-block">
            <Link to={AppRoutes.MY_LIST}>
              <div className="user-block__avatar">
                <img src={userAvatarUrl} alt="User avatar" width="63" height="63"/>
              </div>
            </Link>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImage} alt={`${title} poster`} width="218" height="327"/>
        </div>
      </div>
      <div className="add-review">
        {apiError ? <p>Review is not sent: {apiError}</p> : null}
        <form action="#" className="add-review__form" ref={this.form} onSubmit={this.handleFormSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {[...Array(MAX_RATING)].map((score, i) =>
                <Fragment key={i}>
                  <input className="rating__input" id={`star-${i + 1}`} type="radio" name="rating" value={i + 1}/>
                  <label className="rating__label" htmlFor={`star-${i + 1}`}>{`Rating ${i + 1}`}</label>
                </Fragment>
              )}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              ref={this.reviewTextarea}
              onChange={this.handleReviewChange}
              required={true}
              maxLength={MAX_COMMENT_LENGTH}
              minLength={MIN_COMMENT_LENGTH}
              className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"/>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={!isFormValid}>Post</button>
            </div>
          </div>
        </form>
      </div>

    </section>;
  }
}

AddReviewPage.propTypes = {
  movie: PropTypes.object.isRequired,
  userAvatarUrl: PropTypes.string.isRequired,
  submitReviewHandler: PropTypes.func.isRequired,
  apiError: PropTypes.string,
  onValidateForm: PropTypes.func.isRequired,
  validationStatus: PropTypes.bool.isRequired,
};

export default AddReviewPage;
