import React from 'react';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import './default.scss';

const Video = ({ src, isLeadVideo, videoPlayerRules }) => {
  const { credits } = src || null;
  const { basic: videoCaption } = src.description ? src.description : null;
  const { url: videoPlayer } = src.streams && src.streams[0] ? src.streams[0] : null;
  const { startPlaying, muteON } = videoPlayerRules || null;

  let mainCredit = {};
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0].name ? credits.affiliation[0].name : '';
  }
  const giveCredit = mainCredit.length > 1 ? `Credit: ${mainCredit}` : '';

  return (
    <div className="c-video-component">
      <div className="video-component">
        <video controls autoPlay={startPlaying} muted={muteON}>
          <source src={videoPlayer} type="video/mp4" />
        </video>
      </div>
      {isLeadVideo && !videoCaption && !giveCredit ? null : <Caption src={src} isLeadVideo videoCaption={videoCaption}/>}
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
