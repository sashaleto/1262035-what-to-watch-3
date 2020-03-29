import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more";

it(`Render Show More component`, () => {
  const tree = renderer
    .create(<ShowMore
      onShowMoreClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
