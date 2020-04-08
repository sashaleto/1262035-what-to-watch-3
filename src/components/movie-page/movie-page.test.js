import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MoviePage} from "./movie-page.jsx";
import {AuthorizationStatus} from "../../reducer/user/user";
import history from "../../history";
import {Router} from "react-router-dom";

const mockStore = configureStore([]);
const movie = {
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
    genre: `Crime`,
    released: 1997,
    id: 2,
    trailerLink: `https://upload.wikimedia.org/wikipedia/commons/7/75/2018-01_Ill_flood_drone.webm`,
  },
];
const userAvatarUrl = `img/avatar.jpg`;

it(`Render MoviePage`, () => {
  const store = mockStore({});

  const tree = renderer
        .create(
            <Provider store={store}>
              <Router history={history}>
                <MoviePage
                  movie={movie}
                  movieId={movie.id}
                  comments={[]}
                  userAvatarUrl={userAvatarUrl}
                  authStatus={AuthorizationStatus.AUTH}
                  addToMyList={() => {}}
                  removeFromMyList={() => {}}
                  loadComments={() => {}}
                  setActiveFilm={() => {}}
                  activeFilmId={movie.id}
                  filmsToRender={films}
                />
              </Router>
            </Provider>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
