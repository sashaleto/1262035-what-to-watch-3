import React, {createRef, PureComponent} from "react";

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
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

    componentDidMount() {
      const video = this._videoRef.current;

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
      const {isLoading, isPlaying, progress} = this.state;

      return (
        <Component
          {...this.props}
          videoRef={this._videoRef}
          isLoading={isLoading}
          isPlaying={isPlaying}
          progress={progress}
          onPlayButtonClick={this._togglePlay}
          onFullscreenButtonClick={this._enterFullscreen}
        >
        </Component>
      );
    }
  }

  WithVideo.propTypes = {};

  return WithVideo;
};

export default withVideo;
