import {extend} from "./utils.js";
// import {films} from "./mocks/films.js";
import {GENRES_TITLES, INITIAL_CARDS_COUNT, CARDS_SHOWING_STEP} from "./constants";
import Film from './film';

export const makeGenresSet = (filmsList) => {
  const genres = new Set();
  filmsList.forEach((film) => genres.add(film.genre));
  return [GENRES_TITLES.ALL_GENRES].concat(Array.from(genres));
};

const initialState = {
  activeGenre: GENRES_TITLES.ALL_GENRES,
  allFilms: [],
  films: [],
  genresList: [],
  shownCardsBound: INITIAL_CARDS_COUNT,
  activeFilm: null,
  playingFilm: null,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  SET_FILMS_BY_GENRE: `SET_FILMS_BY_GENRE`,
  EXPAND_CARDS_BOUND: `EXPAND_CARDS_BOUND`,
  RESET_CARDS_BOUND: `RESET_CARDS_BOUND`,
  SET_ACTIVE_FILM: `SET_ACTIVE_FILM`,
  SET_PLAYING_FILM: `SET_PLAYING_FILM`,
  LOAD_FILMS: `LOAD_FILMS`,
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

  setActiveFilm: (film) => ({
    type: ActionType.SET_ACTIVE_FILM,
    payload: film,
  }),

  setPlayingFilm: (film) => ({
    type: ActionType.SET_PLAYING_FILM,
    payload: film,
  }),

  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        const films = Film.parseFilms(response.data);
        dispatch(ActionCreator.loadFilms(films));
      });
  },
};

const filterFilmsByGenre = (movies, genre) => {
  return movies.filter((movie) => movie.genre === genre);
};

const getSameGenreFilms = (films, activeMovie) => {
  return films.filter((film) => film.genre === activeMovie.genre).filter((film) => film.id !== activeMovie.id).slice(0, 4);
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

    case ActionType.SET_ACTIVE_FILM:
      return extend(state, {
        activeFilm: action.payload,
        films: getSameGenreFilms(state.allFilms, action.payload),
      });

    case ActionType.SET_PLAYING_FILM:
      return extend(state, {
        playingFilm: action.payload,
      });

    case ActionType.LOAD_FILMS:
      return extend(state, {
        allFilms: action.payload,
        films: action.payload,
        genresList: makeGenresSet(action.payload),
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
