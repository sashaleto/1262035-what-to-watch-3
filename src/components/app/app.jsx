import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import {connect} from "react-redux";
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import {ActionCreator as ActionCreatorState} from "../../reducer/state/state";
import {AuthorizationStatus, Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import {getActiveFilmId, getShownCardsBound} from "../../reducer/state/selectors";
import {getAuthorizationStatus, getSignInError, getUserInfo} from "../../reducer/user/selectors";
import {getFilms, getPromoFilm, getReviewError} from "../../reducer/data/selectors";
import {getMainFilms, getUserListFilms} from "../../reducer/data/selectors";
import SignIn from "../sign-in/sign-in.jsx";
import {AppRoutes} from "../../constants";
import history from "../../history.js";
import AddReviewPage from "../add-review-page/add-review-page.jsx";
import MyList from "../my-list/my-list.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import withVideo from "../../hocs/with-video/with-video";
import MoviePlayer from "../movie-player/movie-player.jsx";

const MoviePlayerWrapped = withVideo(MoviePlayer);

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderMainScreen() {
    const {
      mainFilms,
      heroMovie,
      onShowMoreClick,
      shownCardsBound,
      userInfo,
      authorizationStatus,
      addToMyList,
      removeFromMyList
    } = this.props;

    if (heroMovie) {
      const avatar = userInfo ? userInfo.avatarUrl : ``;
      return (
        <Main
          films={mainFilms}
          heroMovie={heroMovie}
          onShowMoreClick={onShowMoreClick}
          shownCardsBound={shownCardsBound}
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
      allFilms,
      userInfo,
      authorizationStatus,
      login,
      onSubmitReview,
      reviewError,
      signInError,
      userFilmsList
    } = this.props;
    const avatar = userInfo ? userInfo.avatarUrl : ``;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoutes.ROOT}>
            {this._renderMainScreen()}
          </Route>
          <Route exact path={`${AppRoutes.FILM}/:id`}
            render={(props) => {
              return (Object.keys(allFilms).length)
                ? <MoviePage
                  movie={allFilms[props.match.params.id]}
                  userAvatarUrl={avatar}
                  authStatus={authorizationStatus}
                />
                : null
              ;
            }}
          >
          </Route>
          <Route exact path={`${AppRoutes.PLAYER}/:id`}
            render={(props) => {
              return (Object.keys(allFilms).length)
                ? <MoviePlayerWrapped movie={allFilms[props.match.params.id]}/>
                : null
              ;
            }}>
          </Route>
          <Route exact path={AppRoutes.LOGIN}>
            {
              (authorizationStatus === AuthorizationStatus.AUTH)
                ? <Redirect to={AppRoutes.ROOT}/>
                : <SignIn onSubmit={login} signInError={signInError}/>
            }
          </Route>
          <PrivateRoute exact path={`${AppRoutes.FILM}/:id${AppRoutes.ADD_REVIEW}`}
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
          </PrivateRoute>
          <PrivateRoute exact path={AppRoutes.MY_LIST} render={() => {
            return <MyList films={userFilmsList} avatarUrl={avatar}/>;
          }}>
          </PrivateRoute>
          <Route
            render={() => (
              <Fragment>
                <section style={{padding: `20px 75px`}}>
                  <h1 style={{lineHeight: `1.5`}}>
                    404.
                    <br />
                    <small>Page not found</small>
                  </h1>
                  <Link to={AppRoutes.ROOT}>Go to main page</Link>
                </section>
              </Fragment>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  allFilms: PropTypes.object.isRequired,
  mainFilms: PropTypes.array.isRequired,
  heroMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
  }),
  onShowMoreClick: PropTypes.func.isRequired,
  shownCardsBound: PropTypes.number.isRequired,
  login: PropTypes.func.isRequired,
  activeFilm: PropTypes.object,
  userInfo: PropTypes.object,
  addToMyList: PropTypes.func.isRequired,
  removeFromMyList: PropTypes.func.isRequired,
  onSubmitReview: PropTypes.func.isRequired,
  reviewError: PropTypes.string,
  signInError: PropTypes.string,
  userFilmsList: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  allFilms: getFilms(state),
  userInfo: getUserInfo(state),
  mainFilms: getMainFilms(state),
  shownCardsBound: getShownCardsBound(state),
  activeFilm: getFilms(state)[getActiveFilmId(state)],
  heroMovie: getPromoFilm(state),
  reviewError: getReviewError(state),
  signInError: getSignInError(state),
  userFilmsList: getUserListFilms(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
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
