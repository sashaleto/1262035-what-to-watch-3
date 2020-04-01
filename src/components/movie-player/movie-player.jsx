import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {formatPlayerTime} from "../../utils";

class MoviePlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying: false,
    };

    this._togglePlay = this._togglePlay.bind(this);
    this._enterFullscreen = this._enterFullscreen.bind(this);
  }

  componentDidMount() {
    const {movie} = this.props;
    const video = this._videoRef.current;

    video.src = movie.videoLink;

    video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    video.onpause = () => this.setState({
      isPlaying: false,
    });

    video.ontimeupdate = () => this.setState({
      progress: Math.floor(video.currentTime),
    });
  }

  _togglePlay() {
    this.setState({
      isPlaying: !this.state.isPlaying,
    });
  }

  _enterFullscreen() {
    const video = this._videoRef.current;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen(); // Firefox
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen(); // Chrome and Safari
    }
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.state.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }

  render() {
    const {movie, onExitClick} = this.props;
    const {progress, isPlaying} = this.state;
    const runtimeInSeconds = movie.runTime * 60;
    const percent = 100 * progress / runtimeInSeconds;

    return (
      <div className="player">
        <video
          src={`${movie.videoLink}`}
          className="player__video"
          poster={`${movie.previewImage}`}
          ref={this._videoRef}
        />

        <button type="button" className="player__exit" onClick={onExitClick}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={percent} max="100"/>
              <div className="player__toggler" style={{left: percent + `%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{formatPlayerTime(runtimeInSeconds - progress)}</div>
          </div>

          <div className="player__controls-row">
            {(isPlaying)
              ? <button type="button" className="player__play" onClick={this._togglePlay}>
                <svg viewBox="0 0 14 21" width="14" height="21">
                  <use xlinkHref="#pause"/>
                </svg>
                <span>Pause</span>
              </button>
              : <button type="button" className="player__play" onClick={this._togglePlay}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"/>
                </svg>
                <span>Play</span>
              </button>
            }

            <div className="player__name">{movie.title}</div>

            <button type="button" className="player__full-screen" onClick={this._enterFullscreen}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

MoviePlayer.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    videoLink: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  }).isRequired,
  onExitClick: PropTypes.func.isRequired,
};

export default MoviePlayer;
