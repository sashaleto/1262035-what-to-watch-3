import {extend} from "../../utils.js";
import Film from "../../film";
import {GENRES_TITLES} from "../../constants";

export const makeGenresSet = (films) => {
  const genres = new Set();
  Object.values(films).forEach((film) => genres.add(film.genre));
  return [GENRES_TITLES.ALL_GENRES].concat(Array.from(genres));
};

const initialState = {
  films: {},
  promoFilm: null,
  genresList: [],
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  UPDATE_FILMS: `UPDATE_FILMS`,
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film,
  }),
  updateFilms: (film) => ({
    type: ActionType.UPDATE_FILMS,
    payload: film,
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
        promoFilm: (state.promoFilm && state.promoFilm.id === action.payload.id) ? action.payload : null,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
