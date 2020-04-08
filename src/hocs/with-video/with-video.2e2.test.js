import React from "react";
import PropTypes from "prop-types";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withVideo from "./with-video";

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
  trailerLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

configure({adapter: new Adapter()});

const Player = (props) => {
  const {videoRef, onPlayButtonClick, onFullscreenButtonClick} = props;
  return (
    <div>
      <video ref={videoRef}/>
      <button className="play" onClick={onPlayButtonClick} />
      <button className="fullscreen" onClick={onFullscreenButtonClick} />
    </div>
  );
};

Player.propTypes = {
  videoRef: PropTypes.object.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullscreenButtonClick: PropTypes.func.isRequired,
};

it(`Checks that HOC's callback turn on and turn off the video, set player fullscreen`, () => {
  const PlayerWrapped = withVideo(Player);
  const wrapper = mount(<PlayerWrapped
    movie={movie}
    onExitClick={() => {}}
    src={movie}
  />);

  window.HTMLMediaElement.prototype.play = () => Promise.resolve({});
  window.HTMLMediaElement.prototype.pause = () => {};
  window.HTMLMediaElement.prototype.requestFullscreen = () => {};

  const {_videoRef} = wrapper.instance();

  jest.spyOn(_videoRef.current, `play`);
  jest.spyOn(_videoRef.current, `pause`);
  jest.spyOn(_videoRef.current, `requestFullscreen`);

  wrapper.instance().componentDidMount();

  wrapper.find(`.play`).simulate(`click`);
  wrapper.find(`.play`).simulate(`click`);
  wrapper.find(`.fullscreen`).simulate(`click`);

  expect(_videoRef.current.play).toHaveBeenCalledTimes(1);
  expect(_videoRef.current.pause).toHaveBeenCalledTimes(1);
  expect(_videoRef.current.requestFullscreen).toHaveBeenCalledTimes(1);
});
