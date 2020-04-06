import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {App} from "./app.jsx";
import {INITIAL_CARDS_COUNT} from "../../constants";
import NameSpace from "../../reducer/name-space";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Router} from "react-router-dom";
import history from "../../history";
import Main from "../main/main";

const mockStore = configureStore([]);

const heroMovie = {
  title: `Matrix`,
  posterImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/matrix.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/matrix.jpg`,
  backgroundImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/matrix.jpg`,
  backgroundColor: `#B9B27E`,
  description: `A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.`,
  rating: {
    score: 9.6,
    count: 12292,
  },
  director: `Wachowski Brothers`,
  starring: [`Keanu Reeves`, `Laurence Fishburne`, `Carrie-Anne Moss`],
  runTime: 136,
  genre: `Action`,
  released: 1999,
  id: 19,
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  trailerLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  isFavorite: false,
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
    genre: `Drama`,
    released: 2018,
    id: 4,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/8/84/Funicular_Train_Adventure_in_Barcelona..webm`,
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
    genre: `Crime`,
    released: 1994,
    id: 5,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/b/b5/RainingWebm.webm`,
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
    genre: `Comedy`,
    released: 2019,
    id: 6,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/c/cf/2018-12-25_savoureuse-belfort.webm`,
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
    genre: `Comedy`,
    released: 2003,
    id: 7,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/5/53/Diversity_2019_11.webm`,
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
    genre: `Comedy`,
    released: 2000,
    id: 8,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/8/89/Bauern-Demonstration_Berlin_2019.webm`,
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
    genre: `Thriller`,
    released: 2010,
    id: 9,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/b/b5/RainingWebm.webm`,
  },
];
const crimeFilms = [
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
    genre: `Crime`,
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
    genre: `Crime`,
    released: 1992,
    id: 3,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/8/80/The_Cry_Of_Jazz_%281959%29.webm`,
  },
];
const genres = [`All genres`, `Comedy`, `Drama`, `Crime`, `Romantic`];
const userInfo = {
  avatarUrl: `img/avatar.jpg`
};

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      genresList: genres,
      films,
    },
    [NameSpace.STATE]: {
      activeGenre: `All genres`,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <App
              mainFilms={films}
              moviePageFilms={crimeFilms}
              heroMovie={heroMovie}
              onMovieCardClick={() => {}}
              setPlayingFilm={() => {}}
              onShowMoreClick={() => {}}
              shownCardsBound={INITIAL_CARDS_COUNT}
              playingFilm={null}
              login={() => {}}
              authorizationStatus={AuthorizationStatus.AUTH}
              userInfo={userInfo}
              addToMyList={() => {}}
              removeFromMyList={() => {}}
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
