import React from 'react';
import PropTypes from 'prop-types';
import facebookIcon from '../../../../resources/icons/staff/staff-facebook-icon.svg';
import twitterIcon from '../../../../resources/icons/staff/staff-twitter-icon.svg';
import contributorArray from '../../../layouts/_helper_functions/contributorBadges';
import ContributorBadge from '../../../_helper_components/global/contributorBadge/default';
import './default.scss';

const StaffBio = ({
  role, authorPhoto, byline, longBio, twitter, facebook, expertise, phoneNumber, email,
}) => {
  const expertiseArr = contributorArray(expertise) || [];
  const dividerIndex = expertiseArr.length - 1;

  const badges = expertiseArr.map((el, i) => {
    const tagArr = [{ text: el }];
    if (expertiseArr.indexOf(el) < dividerIndex) {
      return (
        <React.Fragment key={i}>
          <ContributorBadge tags={tagArr} ampPage={false} staffBio={true} />
          <span></span>
        </React.Fragment>
      );
    }
    return (
      <ContributorBadge key={i} tags={tagArr} ampPage={false} staffBio={true} />
    );
  });

  return (
    <>
      <div className='c-staff-bio b-flexRow b-flexCenter'>
        { authorPhoto
        && <div className='staff-image'>
          <img src={authorPhoto}/>
        </div> }
        <div className='c-staffInfo'>
          <div className='staff-text'>
            <div className='staff-byline'>{byline}</div>
            <div className='staff-role'>{role}</div>
            <div className='b-flexRow staff-contact'>
              { phoneNumber && <><div className='staff-phone'>{phoneNumber}</div><span></span></> }
              { email && <div className='staff-email'><a href={`mailto:${email}`}>Email</a></div> }
            </div>
          </div>
          { (twitter || facebook)
          && <div className='staff-social-icons'>
            { facebook && <a href={facebook}><img src={facebookIcon} alt='' /></a> }
            { twitter && <a href={twitter}><img src={twitterIcon} alt='' /></a> }
          </div>
          }
        </div>
      </div>
      <div className={`staff-bio ${badges.length > 0 ? 'hasBadges' : ''}`}>{longBio}</div>
      { badges.length > 0
      && <div className='c-staff-badges'>
          <span>Contributes To:</span>
          <div className='staff-badges'>{badges}</div>
        </div>}
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
  phoneNumber: PropTypes.string,
  email: PropTypes.string,
};

export default StaffBio;
