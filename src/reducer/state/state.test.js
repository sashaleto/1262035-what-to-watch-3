import {ActionCreator, ActionType, reducer} from "../state/state";
import {CARDS_SHOWING_STEP, GENRES_TITLES, INITIAL_CARDS_COUNT} from "../../constants";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    activeGenre: GENRES_TITLES.ALL_GENRES,
    shownCardsBound: INITIAL_CARDS_COUNT,
    activeFilm: -1,
  });
});

it(`Reducer should set active genre by a given value`, () => {
  expect(reducer({
    activeGenre: `Crime`,
  }, {
    type: ActionType.SET_GENRE,
    payload: GENRES_TITLES.ALL_GENRES,
  })).toEqual({
    activeGenre: GENRES_TITLES.ALL_GENRES,
  });
});

it(`Reducer should expand shown films card bound by CARDS_SHOWING_STEP const`, () => {
  expect(reducer({
    shownCardsBound: INITIAL_CARDS_COUNT,
  }, {
    type: ActionType.EXPAND_CARDS_BOUND,
    payload: null,
  })).toEqual({
    shownCardsBound: INITIAL_CARDS_COUNT + CARDS_SHOWING_STEP,
  });
});

it(`Reducer should reset shown films card bound to INITIAL_CARDS_COUNT`, () => {
  expect(reducer({
    shownCardsBound: 1024,
  }, {
    type: ActionType.RESET_CARDS_BOUND,
    payload: null,
  })).toEqual({
    shownCardsBound: INITIAL_CARDS_COUNT,
  });
});

it(`Reducer should set active film by a given film`, () => {
  expect(reducer({
    activeFilm: null,
  }, {
    type: ActionType.SET_ACTIVE_FILM,
    payload: 152,
  })).toEqual({
    activeFilm: 152,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set genre returns correct action`, () => {
    expect(ActionCreator.setGenre(`Crime`)).toEqual({
      type: ActionType.SET_GENRE,
      payload: `Crime`,
    });
  });

  it(`Action creator for expand cards bound returns correct action`, () => {
    expect(ActionCreator.expandCardsBound()).toEqual({
      type: ActionType.EXPAND_CARDS_BOUND,
      payload: null,
    });
  });

  it(`Action creator for reset cards bound returns correct action`, () => {
    expect(ActionCreator.resetCardsBound()).toEqual({
      type: ActionType.RESET_CARDS_BOUND,
      payload: null,
    });
  });

  it(`Action creator for set active card returns correct action`, () => {
    expect(ActionCreator.setActiveFilm(152)).toEqual({
      type: ActionType.SET_ACTIVE_FILM,
      payload: 152,
    });
  });
});
