import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from './movie-card';

Enzyme.configure({
  adapter: new Adapter(),
});

const film = {
  title: `The Gentlemen`,
};

it(`Simulates hover on MovieCard and passing the arguments to handler`, () => {
  const filmTitleClickHandler = jest.fn();
  const movieCardHoverHandler = jest.fn();

  const card = shallow(
      <MovieCard
        film={film}
        onFilmTitleClick={filmTitleClickHandler}
        onMovieCardHover={() => movieCardHoverHandler(film)}
      />
  );

  card.simulate(`mouseenter`);

  expect(movieCardHoverHandler.mock.calls.length).toBe(1);
  expect(movieCardHoverHandler.mock.calls[0][0]).toMatchObject(film);
});
