import React from "react";
import renderer from "react-test-renderer";
import MovieCard from './movie-card';

const film = {
  title: `The Great Gatsby`,
};

it(`Render MovieCard`, () => {
  const tree = renderer
        .create(<MovieCard
          film={film} onFilmTitleClick={() => {}} onMovieCardHover={() => {}}
        />)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
