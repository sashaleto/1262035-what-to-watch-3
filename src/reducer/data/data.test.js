import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {ActionCreator, ActionType, Operation, makeGenresSet, reducer} from "../data/data";
import {GENRES_TITLES} from "../../constants";

const api = createAPI(() => {});

const films = [
  {
    title: `Gangs of new york`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Gangs_of_New_York_Poster.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/gangs_of_new_york.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/gangs_of_new_york.jpg`,
    description: `In 1862, Amsterdam Vallon returns to the Five Points area of New York City seeking revenge against Bill the Butcher, his father's killer.`,
    rating: {
      score: 8.8,
      count: 370881,
    },
    director: `Martin Scorsese`,
    starring: [`Leonardo DiCaprio`, `Cameron Diaz`, `Daniel Day-Lewis`],
    runTime: 136,
    genre: `Crime`,
    released: 2002,
    id: 1,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/0/05/Leipzig_Hauptbahnhof_Time_Lapse_with_iPhone_4s_2012.webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  }, {
    title: `Seven Years in Tibet`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Seven_Years_in_Tibet.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/seven-years-in-tibet.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Seven_Years_in_Tibet.jpg`,
    description: `True story of Heinrich Harrer, an Austrian mountain climber who became friends with the Dalai Lama at the time of China's takeover of Tibet.`,
    rating: {
      score: 3.6,
      count: 112612,
    },
    director: `Jean-Jacques Annaud`,
    starring: [`Brad Pitt`, `David Thewlis`, `BD Wong`],
    runTime: 10,
    genre: `Adventure`,
    released: 1997,
    id: 2,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/7/75/2018-01_Ill_flood_drone.webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  }, {
    title: `Orlando`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Orlando.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/orlando.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Orlando.jpg`,
    description: `Young nobleman Orlando is commanded by Queen Elizabeth I to stay forever young. Miraculously, he does just that. The film follows him as he moves through several centuries of British history, experiencing a variety of lives and relationships along the way, and even changing sex.`,
    rating: {
      score: 2.6,
      count: 12292,
    },
    director: `Sally Potter`,
    starring: [`Tilda Swinton`, `Billy Zane`, `Quentin Crisp`],
    runTime: 85,
    genre: `Drama`,
    released: 1992,
    id: 3,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/8/80/The_Cry_Of_Jazz_%281959%29.webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  }, {
    title: `A Star Is Born`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/A_Star_Is_Born.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/A_Star_Is_Born.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/A_Star_is_Born.jpg`,
    description: `A musician helps a young singer find fame as age and alcoholism send his own career into a downward spiral.`,
    rating: {
      score: 3.9,
      count: 244484,
    },
    director: `Bradley Cooper`,
    starring: [`Lady Gaga`, `Bradley Cooper`, `Sam Elliott`],
    runTime: 90,
    genre: `Drama`,
    released: 2018,
    id: 4,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/8/84/Funicular_Train_Adventure_in_Barcelona..webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  }, {
    title: `Pulp Fiction`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Pulp_Fiction.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/pulp-fiction.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Pulp_Fiction.jpg`,
    description: `The lives of two mob hitmen, a boxer, a gangster & his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.`,
    rating: {
      score: 1.5,
      count: 1635992,
    },
    director: `Quentin Tarantino`,
    starring: [`John Travolta`, `Uma Thurman`, `Samuel L. Jackson`],
    runTime: 124,
    genre: `Crime`,
    released: 1994,
    id: 5,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/b/b5/RainingWebm.webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  }, {
    title: `What We Do in the Shadows`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/What-We-Do-in-the-Shadows.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/what-we-do-in-the-shadows.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/What-We-Do-in-the-Shadows.jpg`,
    description: `A look into the daily (or rather, nightly) lives of three vampires who've lived together for over 100 years, in Staten Island.`,
    rating: {
      score: 7.2,
      count: 6173,
    },
    director: `Jemaine Clement`,
    starring: [`Kayvan Novak`, `Matt Berry`, `Natasia Demetriou`],
    runTime: 65,
    genre: `Comedy`,
    released: 2019,
    id: 6,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/c/cf/2018-12-25_savoureuse-belfort.webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  }, {
    title: `Johnny English`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Johnny_English.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/johnny-english.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Johnny_English.jpg`,
    description: `After a sudden attack on the MI5, Johnny English, Britain's most confident yet unintelligent spy, becomes Britain's only spy.`,
    rating: {
      score: 10,
      count: 136843,
    },
    director: `Peter Howitt`,
    starring: [`Rowan Atkinson`, `John Malkovich`, `Natalie Imbruglia`],
    runTime: 98,
    genre: `Comedy`,
    released: 2003,
    id: 7,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/5/53/Diversity_2019_11.webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  }, {
    title: `Snatch`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Snatch.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/snatch.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Snatch.jpg`,
    description: `Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.`,
    rating: {
      "score": 0.2,
      "count": 716577,
    },
    director: `Guy Ritchie`,
    starring: [`Jason Statham`, `Brad Pitt`, `Benicio Del Toro`],
    runTime: 120,
    genre: `Comedy`,
    released: 2000,
    id: 8,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/8/89/Bauern-Demonstration_Berlin_2019.webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  }, {
    title: `Shutter Island`,
    posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Shutter_Island.jpg`,
    previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/shutter-island.jpg`,
    backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Shutter_Island.jpg`,
    description: `In 1954, a U.S. Marshal investigates the disappearance of a murderer, who escaped from a hospital for the criminally insane.`,
    rating: {
      score: 4.1,
      count: 1002557,
    },
    director: `Martin Scorsese`,
    starring: [`Leonardo DiCaprio`, `Emily Mortimer`, `Mark Ruffalo`],
    runTime: 110,
    genre: `Thriller`,
    released: 2010,
    id: 9,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/b/b5/RainingWebm.webm`,
    videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    allFilms: [],
    films: [],
    genresList: [],
  });
});

it(`Reducer should update films with a loaded films`, () => {
  expect(reducer({
    allFilms: [],
    films: [],
    genresList: [],
  }, {
    type: ActionType.LOAD_FILMS,
    payload: films,
  })).toEqual({
    allFilms: films,
    films,
    genresList: makeGenresSet(films),
  });
});

it(`Reducer should filter films by a given genre`, () => {
  expect(reducer({
    allFilms: films,
    films,
  }, {
    type: ActionType.SET_FILMS_BY_GENRE,
    payload: `Adventure`,
  })).toEqual({
    allFilms: films,
    films: [{
      title: `Seven Years in Tibet`,
      posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Seven_Years_in_Tibet.jpg`,
      previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/seven-years-in-tibet.jpg`,
      backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Seven_Years_in_Tibet.jpg`,
      description: `True story of Heinrich Harrer, an Austrian mountain climber who became friends with the Dalai Lama at the time of China's takeover of Tibet.`,
      rating: {
        score: 3.6,
        count: 112612,
      },
      director: `Jean-Jacques Annaud`,
      starring: [`Brad Pitt`, `David Thewlis`, `BD Wong`],
      runTime: 10,
      genre: `Adventure`,
      released: 1997,
      id: 2,
      trailerLink: `https://upload.wikimedia.org/wikipedia/commons/7/75/2018-01_Ill_flood_drone.webm`,
      videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    }],
  });
});

it(`Reducer should return all films for "All genres"`, () => {
  expect(reducer({
    allFilms: films,
    films: [{
      title: `Seven Years in Tibet`,
      posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Seven_Years_in_Tibet.jpg`,
      previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/seven-years-in-tibet.jpg`,
      backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Seven_Years_in_Tibet.jpg`,
      description: `True story of Heinrich Harrer, an Austrian mountain climber who became friends with the Dalai Lama at the time of China's takeover of Tibet.`,
      rating: {
        score: 3.6,
        count: 112612,
      },
      director: `Jean-Jacques Annaud`,
      starring: [`Brad Pitt`, `David Thewlis`, `BD Wong`],
      runTime: 10,
      genre: `Adventure`,
      released: 1997,
      id: 2,
      trailerLink: `https://upload.wikimedia.org/wikipedia/commons/7/75/2018-01_Ill_flood_drone.webm`,
      videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    }],
  }, {
    type: ActionType.SET_FILMS_BY_GENRE,
    payload: GENRES_TITLES.ALL_GENRES,
  })).toEqual({
    allFilms: films,
    films,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for set films by genre returns correct action`, () => {
    expect(ActionCreator.setFilmsByGenre(`Adventure`)).toEqual({
      type: ActionType.SET_FILMS_BY_GENRE,
      payload: `Adventure`,
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, []);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [],
        });
      });
  });
});
