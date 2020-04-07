import {extend} from "../../utils.js";
import Film from "../../film";
import {AppRoutes, GENRES_TITLES} from "../../constants";
import history from "../../history";

export const makeGenresSet = (films) => {
  const genres = new Set();
  Object.values(films).forEach((film) => genres.add(film.genre));
  return [GENRES_TITLES.ALL_GENRES].concat(Array.from(genres));
};

const initialState = {
  films: {},
  promoFilm: null,
  genresList: [],
  currentComments: [],
  reviewError: null,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  UPDATE_FILMS: `UPDATE_FILMS`,
  UPDATE_COMMENTS: `UPDATE_COMMENTS`,
  SET_COMMENT_ERROR: `SET_COMMENT_ERROR`,
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  }),
  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film,
  }),
  updateFilms: (film) => ({
    type: ActionType.UPDATE_FILMS,
    payload: film,
  }),
  updateComments: (comment) => ({
    type: ActionType.UPDATE_COMMENTS,
    payload: comment,
  }),
  setCommentError: (message) => ({
    type: ActionType.SET_COMMENT_ERROR,
    payload: message,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const films = Film.mapIdToFilms(Film.parseFilms(response.data));
        dispatch(ActionCreator.loadFilms(films));
      });
  },

  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        const promoFilm = Film.parseFilm(response.data);
        dispatch(ActionCreator.loadPromoFilm(promoFilm));
      });
  },

  addFilmToUserList: (filmId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/1`)
      .then((response) => {
        const savedFilm = Film.parseFilm(response.data);
        dispatch(ActionCreator.updateFilms(savedFilm));
      });
  },

  removeFilmFromUserList: (filmId) => (dispatch, getState, api) => {
    return api.post(`/favorite/${filmId}/0`)
      .then((response) => {
        const removedFilm = Film.parseFilm(response.data);
        dispatch(ActionCreator.updateFilms(removedFilm));
      });
  },

  getCommentsToFilm: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      });
  },

  postCommentToFilm: (filmId, review) => (dispatch, getState, api) => {
    return api.post(`/comments/${filmId}`, {
      rating: review.rating,
      comment: review.comment,
    })
      .then((response) => {
        const updatedComments = response.data;
        dispatch(ActionCreator.updateComments(updatedComments));
        dispatch(ActionCreator.setCommentError(null));
        history.push(`${AppRoutes.FILM}/${filmId}`);
      })
      .catch((err) => {
        dispatch(ActionCreator.setCommentError(err.response.data.error));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
        genresList: makeGenresSet(action.payload),
      });

    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload,
      });

    case ActionType.UPDATE_FILMS:
      const films = state.films;
      films[action.payload.id] = action.payload;

      return extend(state, {
        films,
        promoFilm: (state.promoFilm && state.promoFilm.id === action.payload.id) ? action.payload : state.promoFilm,
      });

    case ActionType.LOAD_COMMENTS:
      return extend(state, {
        currentComments: action.payload,
      });

    case ActionType.UPDATE_COMMENTS:
      return extend(state, {
        currentComments: action.payload,
      });

    case ActionType.SET_COMMENT_ERROR:
      return extend(state, {
        reviewError: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
