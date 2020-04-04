import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.DATA;

export const getAllFilms = (state) => {
  return state[NAME_SPACE].allFilms;
};

export const getFilms = (state) => {
  return state[NAME_SPACE].films;
};

export const getGenresList = (state) => {
  return state[NAME_SPACE].genresList;
};
