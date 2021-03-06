import React from "react";
import renderer from "react-test-renderer";
import MoviePlayer from "./movie-player.jsx";

const movie = {
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
  year: 1999,
  id: 19,
  videoLink: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  trailerLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

it(`Render MoviePlayer on pause`, () => {
  const tree = renderer
    .create(
        <MoviePlayer
          movie={movie}
          progress={0}
          isPlaying={false}
          videoRef={React.createRef()}
          onPlayButtonClick={() => {}}
          onFullscreenButtonClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
