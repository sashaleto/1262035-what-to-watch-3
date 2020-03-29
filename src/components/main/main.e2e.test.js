import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Main} from "./main";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {INITIAL_CARDS_COUNT} from "../../constants";

Enzyme.configure({
  adapter: new Adapter(),
});

const movieData = {
  title: `The Great Gatsby`,
  genre: `Drama`,
  year: 2013,
};

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
    genre: `Crime`,
    released: 2002,
    id: 1,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/0/05/Leipzig_Hauptbahnhof_Time_Lapse_with_iPhone_4s_2012.webm`,
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
    genre: `Adventure`,
    released: 1997,
    id: 2,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/7/75/2018-01_Ill_flood_drone.webm`,
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
    genre: `Drama`,
    released: 1992,
    id: 3,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/8/80/The_Cry_Of_Jazz_%281959%29.webm`,
  }
];
const mockStore = configureStore([]);
const genres = [`All genres`, `Comedy`, `Drama`, `Crime`, `Romantic`];

it(`Should movie card title be pressed`, () => {
  const onMovieCardClick = jest.fn();
  const preventDefault = {
    preventDefault: jest.fn()
  };
  const store = mockStore({
    activeGenre: `All genres`,
    genresList: genres,
  });

  const mainScreen = mount(
      <Provider store={store}>
        <Main
          films={films}
          movieData={movieData}
          onMovieCardClick={onMovieCardClick}
          onShowMoreClick={() => {}}
          shownCardsBound={INITIAL_CARDS_COUNT}
        />
      </Provider>
  );

  const movieCardTitles = mainScreen.find(`.small-movie-card__title`);

  movieCardTitles.forEach((card) => card.simulate(`click`, preventDefault));

  expect(onMovieCardClick.mock.calls.length).toBe(films.length);
});
