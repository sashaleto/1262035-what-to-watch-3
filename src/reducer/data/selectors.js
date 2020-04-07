import NameSpace from "../name-space.js";
import {createSelector} from "reselect";
import {getActiveFilmId, getActiveGenre} from "../state/selectors";
import {GENRES_TITLES} from "../../constants";

const NAME_SPACE = NameSpace.DATA;

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getUserListFilms = (state) => {
  return Object.values(state[NAME_SPACE].films).filter((movie) => movie.isFavorite);
};

export const getCurrentComments = (state) => {
  return state[NAME_SPACE].currentComments;
};

export const getGenresList = (state) => {
  return state[NAME_SPACE].genresList;
};

export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

export const getReviewError = (state) => {
  return state[NAME_SPACE].reviewError;
};

export const getMainFilms = createSelector(
    [getActiveGenre, getFilms],
    (genre, allFilms) => {
      return Object.values(allFilms).filter((movie) => movie.genre === genre || genre === GENRES_TITLES.ALL_GENRES);
    }
);

export const getMoviePageFilms = createSelector(
    [getActiveFilmId, getFilms],
    (activeFilmId, allFilms) => {
      if (activeFilmId === -1) {
        return [];
      }
      const activeFilmGenre = allFilms[activeFilmId].genre;
      return Object.values(allFilms).filter((film) => film.genre === activeFilmGenre)
        .filter((film) => film.id !== activeFilmId)
        .slice(0, 4);
    }
);
