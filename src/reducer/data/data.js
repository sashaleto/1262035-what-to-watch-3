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
  genresList: [],
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
        genresList: makeGenresSet(action.payload),
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
