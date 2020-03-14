import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {src, posterURL, isMuted, isAutoplay} = this.props;

    return (
      <video
        src={src}
        poster={posterURL}
        width="280"
        height="175"
        muted={isMuted}
        autoPlay={isAutoplay}
      />
    );
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  posterURL: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isAutoplay: PropTypes.bool.isRequired,
};

export default VideoPlayer;
