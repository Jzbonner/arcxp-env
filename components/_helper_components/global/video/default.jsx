import React from 'react';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import './default.scss';
import '../../../../src/styles/base/_utility.scss';

const Video = ({
  src, isLeadVideo, featuredVideoPlayerRules, inlineVideoPlayerRules, isInlineVideo,
}) => {
  const { credits } = src || null;
  const { basic: videoCaption } = src.description ? src.description : null;
  const { url: videoPlayer } = src.streams && src.streams[0] ? src.streams[0] : null;
  const { startPlaying, muteON } = featuredVideoPlayerRules || inlineVideoPlayerRules;

  const screenSize = checkWindowSize();

  let mainCredit = {};
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0].name ? credits.affiliation[0].name : '';
  }
  let videoMarginBottom;
  if (isInlineVideo) {
    videoMarginBottom = 'b-margin-bottom-d40-m20';
  }
  const giveCredit = mainCredit.length > 1 ? `Credit: ${mainCredit}` : '';

  const smartChecker = () => {
    if (
      (isLeadVideo && !giveCredit && !videoCaption)
      || (isLeadVideo && giveCredit && !videoCaption && screenSize.width > 1024)
      || (isInlineVideo && !videoCaption)
    ) {
      return null;
    }

    if (isLeadVideo && giveCredit && !videoCaption && screenSize.width < 1024) {
      return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
    }

    return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
  };

  return (
    <div className={`c-video-component ${videoMarginBottom}`}>
      <div className="video-component">
        <video controls autoPlay={startPlaying} muted={muteON}>
          <source src={videoPlayer} type="video/mp4" />
        </video>
      </div>
      {smartChecker()}
      <p className={`video-credit-text ${isInlineVideo ? 'is-inline' : null}`}>{giveCredit}</p>
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.object.isRequired,
  isLeadVideo: PropTypes.bool,
  isInlineVideo: PropTypes.bool,
  featuredVideoPlayerRules: PropTypes.object,
  inlineVideoPlayerRules: PropTypes.object,
};

export default Video;
