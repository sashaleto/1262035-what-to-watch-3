import NameSpace from "../name-space.js";


const NAME_SPACE = NameSpace.STATE;

export const getActiveFilmId = (state) => {
  return state[NAME_SPACE].activeFilm;
};

export const getPlayingFilm = (state) => {
  return state[NAME_SPACE].playingFilm;
};

export const getShownCardsBound = (state) => {
  return state[NAME_SPACE].shownCardsBound;
};

export const getActiveGenre = (state) => {
  return state[NAME_SPACE].activeGenre;
};
