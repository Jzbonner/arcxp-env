import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import './default.scss';

const Video = ({ src, isLeadVideo, videoPlayerRules }) => {
  const { credits } = src || null;
  const { basic: videoCaption } = src.description ? src.description : null;
  const { url: videoPlayer } = src.streams && src.streams[0] ? src.streams[0] : null;
  const { startPlaying, muteON } = videoPlayerRules || null;

  const checkWindowSize = () => {
    const isClient = typeof window === 'object';

    const getSize = () => ({
      width: isClient ? window.innerWidth : undefined,
    });

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
      if (!isClient) {
        return false;
      }
      const handleResize = () => {
        setWindowSize(getSize());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    });

    return windowSize;
  };

  const screenSize = checkWindowSize();

  let mainCredit = {};
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0].name ? credits.affiliation[0].name : '';
  }
  const giveCredit = mainCredit.length > 1 ? `Credit: ${mainCredit}` : '';

  const smartChecker = () => {
    if (isLeadVideo && !giveCredit && !videoCaption) {
      return null;
    }
    if (isLeadVideo && giveCredit && !videoCaption && screenSize.width < 1024) {
      return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
    }

    if (isLeadVideo && giveCredit && !videoCaption && screenSize.width > 1024) {
      return null;
    }

    return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
  };

  return (
    <div className="c-video-component">
      <div className="video-component">
        <video controls autoPlay={startPlaying} muted={muteON}>
          <source src={videoPlayer} type="video/mp4" />
        </video>
      </div>
      {smartChecker()}
      <p className="video-credit-text">{giveCredit}</p>
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.object.isRequired,
  isLeadVideo: PropTypes.bool,
  videoPlayerRules: PropTypes.object,
};

export default Video;
