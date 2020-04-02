import React from 'react';
import PropTypes from 'prop-types';
import {formatPlayerTime} from "../../utils";

const MoviePlayer = (props) => {
  const {
    movie,
    onExitClick,
    progress,
    isPlaying,
    videoRef,
    onPlayButtonClick,
    onFullscreenButtonClick
  } = props;
  const runtimeInSeconds = movie.runTime * 60;
  const percent = 100 * progress / runtimeInSeconds;
  const time = formatPlayerTime(runtimeInSeconds - progress);

  return (
    <div className="player">
      <video
        src={`${movie.videoLink}`}
        className="player__video"
        poster={`${movie.previewImage}`}
        ref={videoRef}
      />

      <button type="button" className="player__exit" onClick={onExitClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={percent} max="100"/>
            <div className="player__toggler" style={{left: percent + `%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{time}</div>
        </div>

        <div className="player__controls-row">
          {(isPlaying)
            ? <button type="button" className="player__play" onClick={onPlayButtonClick}>
              <svg viewBox="0 0 14 21" width="14" height="21">
                <use xlinkHref="#pause"/>
              </svg>
              <span>Pause</span>
            </button>
            : <button type="button" className="player__play" onClick={onPlayButtonClick}>
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
              <span>Play</span>
            </button>
          }

          <div className="player__name">{movie.title}</div>

          <button type="button" className="player__full-screen" onClick={onFullscreenButtonClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

MoviePlayer.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  }).isRequired,
  onExitClick: PropTypes.func.isRequired,
  progress: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  videoRef: PropTypes.object.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onFullscreenButtonClick: PropTypes.func.isRequired,
};

export default MoviePlayer;
