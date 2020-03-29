import {extend} from "./utils.js";
import {films} from "./mocks/films.js";
import {GENRES_TITLES, INITIAL_CARDS_COUNT, CARDS_SHOWING_STEP} from "./constants";

export const makeGenresSet = (filmsList) => {
  const genres = new Set();
  filmsList.forEach((film) => genres.add(film.genre));
  return [GENRES_TITLES.ALL_GENRES].concat(Array.from(genres));
};

const initialState = {
  activeGenre: GENRES_TITLES.ALL_GENRES,
  allFilms: films,
  films,
  genresList: makeGenresSet(films),
  shownCardsBound: INITIAL_CARDS_COUNT,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FILMS_BY_GENRE: `SET_FILMS_BY_GENRE`,
  EXPAND_CARDS_BOUND: `EXPAND_CARDS_BOUND`,
  RESET_CARDS_BOUND: `RESET_CARDS_BOUND`,
};

const ActionCreator = {
  setFilmsByGenre: (genre) => ({
    type: ActionType.SET_FILMS_BY_GENRE,
    payload: genre,
  }),

  setGenre: (genre) => ({
    type: ActionType.SET_GENRE,
    payload: genre,
  }),

  expandCardsBound: () => ({
    type: ActionType.EXPAND_CARDS_BOUND,
    payload: null,
  }),

  resetCardsBound: () => ({
    type: ActionType.RESET_CARDS_BOUND,
    payload: null,
  }),
};

const filterFilmsByGenre = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        activeGenre: action.payload,
      });

    case ActionType.SET_FILMS_BY_GENRE:
      if (action.payload === GENRES_TITLES.ALL_GENRES) {
        return extend(state, {
          films: state.allFilms,
        });
      }

      return extend(state, {
        films: filterFilmsByGenre(state.allFilms, action.payload),
      });

    case ActionType.EXPAND_CARDS_BOUND:
      return extend(state, {
        shownCardsBound: state.shownCardsBound + CARDS_SHOWING_STEP,
      });

    case ActionType.RESET_CARDS_BOUND:
      return extend(state, {
        shownCardsBound: INITIAL_CARDS_COUNT,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
