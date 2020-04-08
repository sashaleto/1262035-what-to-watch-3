import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from './movie-card';

Enzyme.configure({
  adapter: new Adapter(),
});

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

it(`Simulates hover on MovieCard and passing the arguments to handler`, () => {
  const movieCardHoverHandler = jest.fn();

  const card = shallow(
      <MovieCard
        film={film}
        onMovieCardHover={() => movieCardHoverHandler(film)}
        onMovieCardLeave={() => {}}
        isHovered={false}
      />
  );

  card.simulate(`mouseenter`);

  expect(movieCardHoverHandler.mock.calls.length).toBe(1);
  expect(movieCardHoverHandler.mock.calls[0][0]).toMatchObject(film);
});
