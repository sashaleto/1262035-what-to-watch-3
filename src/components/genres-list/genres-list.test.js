import React from "react";
import renderer from "react-test-renderer";
import {GenresList} from "./genres-list.jsx";

const genres = [`All genres`, `Comedy`, `Drama`, `Crime`, `Romantic`];

it(`Render Genres List`, () => {
  const tree = renderer
    .create(<GenresList
      activeGenre={genres[0]}
      genresList={genres}
      onGenreTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
