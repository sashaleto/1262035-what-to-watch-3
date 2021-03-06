import React from "react";
import renderer from "react-test-renderer";
import MovieCard from './movie-card.jsx';
import history from "../../history";
import {Router} from "react-router-dom";

const film = {
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
  trailerLink: `https://upload.wikimedia.org/wikipedia/commons/8/84/Funicular_Train_Adventure_in_Barcelona..webm`,
};

it(`Render MovieCard`, () => {
  const tree = renderer
        .create(
            <Router history={history}>
              <MovieCard
                film={film}
                onMovieCardHover={() => {}}
                onMovieCardLeave={() => {}}
                isHovered={false}
              />
            </Router>
        )
        .toJSON();

  expect(tree).toMatchSnapshot();
});
