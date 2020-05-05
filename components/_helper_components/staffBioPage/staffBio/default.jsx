import React from 'react';
import PropTypes from 'prop-types';
import facebookIcon from '../../../../resources/icons/staff/staff-facebook-icon.svg';
import twitterIcon from '../../../../resources/icons/staff/staff-twitter-icon.svg';
import './default.scss';

/* eslint-disable-next-line */
const StaffBio = ({ role, authorPhoto, byline, longBio, twitter, facebook, expertise}) => {
  return (
    <>
      <div className='b-flexRow b-flexCenter b-margin-bottom-d30-m20'>
        <div className='staff-image'>
          <img src={authorPhoto}/>
        </div>
        <div className='c-staffInfo'>
          <div>
            <div className='staff-byline'>{byline}</div>
            <div className='staff-role'>{role}</div>
          </div>
          <div className='staff-social-icons'>
              <a href={facebook}>
                <img src={facebookIcon} alt='' />
              </a>
              <a href={twitter}>
                <img src={twitterIcon} alt='' />
              </a>
          </div>
        </div>
      </div>
      <div className='staff-bio'>{longBio}</div>
    </>
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
