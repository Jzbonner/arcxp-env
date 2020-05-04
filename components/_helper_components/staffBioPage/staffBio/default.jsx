import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable-next-line */
const StaffBio = ({ role, authorPhoto, byline, longBio, twitter, facebook, expertise}) => {
  return (
    <div>
      <img src={authorPhoto}/>
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
