import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Router, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import {ActionCreator as ActionCreatorState} from "../../reducer/state/state";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import {getActiveFilmId, getPlayingFilm, getShownCardsBound} from "../../reducer/state/selectors";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors";
import {getFilms, getPromoFilm, getReviewError} from "../../reducer/data/selectors";
import {getMainFilms, getMoviePageFilms} from "../../reducer/data/selectors";
import SignIn from "../sign-in/sign-in.jsx";
import {AppRoutes} from "../../constants";
import history from "../../history.js";
import AddReviewPage from "../add-review-page/add-review-page.jsx";

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
      shownCardsBound,
      userInfo,
      authorizationStatus,
      addToMyList,
      removeFromMyList
    } = this.props;

    if (typeof activeFilm !== `undefined`) {
      const avatar = userInfo ? userInfo.avatarUrl : ``;
      return (<MoviePage
        movie={activeFilm}
        films={moviePageFilms}
        onMovieCardClick={onMovieCardClick}
        playingFilm={playingFilm}
        setPlayingFilm={setPlayingFilm}
        userAvatarUrl={avatar}
        authStatus={authorizationStatus}
        addToMyList={addToMyList}
        removeFromMyList={removeFromMyList}
      />);
    }

    if (heroMovie) {
      const avatar = userInfo ? userInfo.avatarUrl : ``;
      return (
        <Main
          films={mainFilms}
          heroMovie={heroMovie}
          onMovieCardClick={onMovieCardClick}
          onShowMoreClick={onShowMoreClick}
          shownCardsBound={shownCardsBound}
          playingFilm={playingFilm}
          setPlayingFilm={setPlayingFilm}
          userAvatarUrl={avatar}
          authStatus={authorizationStatus}
          addToMyList={addToMyList}
          removeFromMyList={removeFromMyList}
        />
      );
    }

    return null;
  }

  render() {
    const {
      moviePageFilms,
      allFilms,
      onMovieCardClick,
      playingFilm,
      setPlayingFilm,
      heroMovie,
      userInfo,
      authorizationStatus,
      login,
      addToMyList,
      removeFromMyList,
      onSubmitReview,
      reviewError
    } = this.props;
    const avatar = userInfo ? userInfo.avatarUrl : ``;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoutes.ROOT}>
            {this._renderMainScreen()}
          </Route>
          <Route exact path={`${AppRoutes.FILM}/:id`}>
            {
              (heroMovie)
                ? <MoviePage
                  movie={heroMovie}
                  films={moviePageFilms}
                  onMovieCardClick={onMovieCardClick}
                  playingFilm={playingFilm}
                  setPlayingFilm={setPlayingFilm}
                  userAvatarUrl={avatar}
                  authStatus={authorizationStatus}
                  addToMyList={addToMyList}
                  removeFromMyList={removeFromMyList}
                />
                : null
            }
          </Route>
          <Route exact path={AppRoutes.LOGIN}>
            <SignIn onSubmit={login}/>
          </Route>
          <Route exact path={`${AppRoutes.FILM}/:id${AppRoutes.ADD_REVIEW}`}
            render={(props) => {
              return (Object.keys(allFilms).length)
                ? <AddReviewPage
                  movie={allFilms[props.match.params.id]}
                  userAvatarUrl={avatar}
                  submitReviewHandler={onSubmitReview}
                  apiError={reviewError}
                />
                : null
              ;
            }}
          >
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  allFilms: PropTypes.object.isRequired,
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
  login: PropTypes.func.isRequired,
  activeFilm: PropTypes.object,
  playingFilm: PropTypes.object,
  userInfo: PropTypes.object,
  addToMyList: PropTypes.func.isRequired,
  removeFromMyList: PropTypes.func.isRequired,
  onSubmitReview: PropTypes.func.isRequired,
  reviewError: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  allFilms: getFilms(state),
  userInfo: getUserInfo(state),
  mainFilms: getMainFilms(state),
  moviePageFilms: getMoviePageFilms(state),
  shownCardsBound: getShownCardsBound(state),
  activeFilm: getFilms(state)[getActiveFilmId(state)],
  playingFilm: getPlayingFilm(state),
  heroMovie: getPromoFilm(state),
  reviewError: getReviewError(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onMovieCardClick(filmId) {
    dispatch(ActionCreatorState.setActiveFilm(filmId));
  },
  setPlayingFilm(film) {
    dispatch(ActionCreatorState.setPlayingFilm(film));
  },
  onShowMoreClick() {
    dispatch(ActionCreatorState.expandCardsBound());
  },
  addToMyList(filmId) {
    dispatch(DataOperation.addFilmToUserList(filmId));
  },
  removeFromMyList(filmId) {
    dispatch(DataOperation.removeFilmFromUserList(filmId));
  },
  onSubmitReview(filmId, review) {
    dispatch(DataOperation.postCommentToFilm(filmId, review));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
