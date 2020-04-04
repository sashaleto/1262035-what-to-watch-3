import {extend} from "../../utils.js";
import {CARDS_SHOWING_STEP, GENRES_TITLES, INITIAL_CARDS_COUNT} from "../../constants";

const initialState = {
  activeGenre: GENRES_TITLES.ALL_GENRES,
  shownCardsBound: INITIAL_CARDS_COUNT,
  activeFilm: null,
  playingFilm: null,
};

const ActionType = {
  SET_GENRE: `SET_GENRE`,
  EXPAND_CARDS_BOUND: `EXPAND_CARDS_BOUND`,
  RESET_CARDS_BOUND: `RESET_CARDS_BOUND`,
  SET_ACTIVE_FILM: `SET_ACTIVE_FILM`,
  SET_PLAYING_FILM: `SET_PLAYING_FILM`,
};

const ActionCreator = {
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_GENRE:
      return extend(state, {
        activeGenre: action.payload,
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
      });

    case ActionType.SET_PLAYING_FILM:
      return extend(state, {
        playingFilm: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator};
