import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GenresList} from "./genres-list";

Enzyme.configure({
  adapter: new Adapter(),
});

const genres = [`All genres`, `Comedy`, `Drama`, `Crime`, `Romantic`];

it(`Simulates click on GenresList and passing the arguments to handler`, () => {
  const genreTitleClickHandler = jest.fn();
  const preventDefault = {
    preventDefault: jest.fn()
  };

  const list = shallow(
      <GenresList
        activeGenre={genres[1]}
        genresList={genres}
        onGenreTitleClick={() => genreTitleClickHandler(genres[0])}
      />
  );

  const title = list.find(`.catalog__genres-link`).first();

  title.simulate(`click`, preventDefault);

  expect(genreTitleClickHandler.mock.calls.length).toBe(1);
  expect(genreTitleClickHandler.mock.calls[0][0]).toBe(genres[0]);
});
