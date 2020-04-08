import React from 'react';
import PropTypes from 'prop-types';

const VideoPlayer = ({src, posterURL, isMuted, isAutoplay}) => {
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
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  posterURL: PropTypes.string.isRequired,
  isMuted: PropTypes.bool.isRequired,
  isAutoplay: PropTypes.bool.isRequired,
};

export default VideoPlayer;
