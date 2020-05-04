import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../global/image/default';
import './default.scss';

/* eslint-disable-next-line */
const StaffBio = ({ role, authorPhoto, byline, longBio, twitter, facebook, expertise}) => {
  const src = { url: authorPhoto };
  return (
    <div className="b-flexRow">
      <div className="staff-image"><Image src={src} imageType="isInlineImage" width={160} height={160} /></div>
      <div className="c-staffInfo">
        <div className="staff-byline">{byline}</div>
        <div className="staff-role">{role}</div>
      </div>
      <div></div>
    </div>
  );
};

StaffBio.propTypes = {
  role: PropTypes.string,
  authorPhoto: PropTypes.string,
  byline: PropTypes.string,
  longBio: PropTypes.string,
  twitter: PropTypes.string,
  facebook: PropTypes.string,
  expertise: PropTypes.string,
};

export default StaffBio;
