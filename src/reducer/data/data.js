import {extend} from "../../utils.js";
import Film from "../../film";
import {GENRES_TITLES} from "../../constants";

export const makeGenresSet = (filmsList) => {
  const genres = new Set();
  filmsList.forEach((film) => genres.add(film.genre));
  return [GENRES_TITLES.ALL_GENRES].concat(Array.from(genres));
};

const initialState = {
  allFilms: [],
  films: [],
  genresList: [],
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  SET_FILMS_BY_GENRE: `SET_FILMS_BY_GENRE`,
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  setFilmsByGenre: (genre) => ({
    type: ActionType.SET_FILMS_BY_GENRE,
    payload: genre,
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        allFilms: action.payload,
        films: action.payload,
        genresList: makeGenresSet(action.payload),
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator, Operation};
