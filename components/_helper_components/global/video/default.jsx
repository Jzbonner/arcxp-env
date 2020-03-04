import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import './default.scss';
import '../../../../src/styles/base/_utility.scss';

const Video = ({
  src, isLeadVideo, isInlineVideo, maxTabletViewWidth,
}) => {
  const { credits, _id: videoID } = src || {};
  const { basic: videoCaption } = src.description ? src.description : {};
  // const { url: videoPlayer } = src.streams && src.streams[0] ? src.streams[0] : {};
  // const { startPlaying, muteON } = featuredVideoPlayerRules || inlineVideoPlayerRules;
  // const { url: inlineVideoThumb } = src && src.promo_items ? src.promo_items.basic : {};
  const screenSize = checkWindowSize();

  let mainCredit;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
  }

  useEffect(() => {
    window.powaBoot();
  }, []);

  const videoMarginBottom = 'b-margin-bottom-d40-m20';
  const giveCredit = mainCredit ? `Credit: ${mainCredit}` : null;

  const smartChecker = () => {
    if (
      (isLeadVideo && !giveCredit && !videoCaption)
      || (isLeadVideo && giveCredit && !videoCaption && screenSize.width > maxTabletViewWidth)
      || (isInlineVideo && !videoCaption)
    ) {
      return null;
    }

    if (isLeadVideo && giveCredit && !videoCaption && screenSize.width < maxTabletViewWidth) {
      return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
    }

    return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
  };

  return (
    <div className={`c-video-component ${isInlineVideo ? videoMarginBottom : ''}`}>
      <div className="video-component">
        <div className="powa" data-org="ajc" data-api="sandbox" data-uuid={videoID} data-aspect-ratio="0.5625"></div>
      </div>
      <p className={`video-credit-text ${isInlineVideo ? 'is-inline' : null}`}>{giveCredit}</p>
      {smartChecker()}
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.object.isRequired,
  isLeadVideo: PropTypes.bool,
  isInlineVideo: PropTypes.bool,
  featuredVideoPlayerRules: PropTypes.object,
  inlineVideoPlayerRules: PropTypes.object,
  maxTabletViewWidth: PropTypes.number,
};

export default Video;
