import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const genres = [`Comedy`, `Drama`, `Crime`, `Romantic`];

it(`Render Genres List`, () => {
  const tree = renderer
        .create(<GenresList genres={genres} />)
        .toJSON();

  expect(tree).toMatchSnapshot();
});
