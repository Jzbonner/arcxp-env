import React from 'react';
import { useAppContext } from 'fusion:context';
import FacebookIcon from '../../../resources/icons/staff/StaffFacebookIcon';
import TwitterIcon from '../../../resources/icons/staff/StaffTwitterIcon';
import contributorArray from '../../layouts/_helper_functions/contributorBadges';
import ContributorBadge from '../../_helper_components/global/contributorBadge/default';
import './default.scss';

const StaffBio = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;

  const {
    role,
    image: authorPhoto,
    byline,
    longBio,
    twitter,
    facebook,
    expertise,
    email,
    custom_ajc_phone: phoneNumber,
  } = globalContent || {};

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
      <div className="c-staff-bio">
        <div className="b-flexRow b-flexCenter">
          {authorPhoto && (
            <div className="staff-image">
              <img src={authorPhoto} alt={`${byline} staff image`}/>
            </div>
          )}
          <div className="c-staffInfo">
            <div className="staff-text">
              <div className="staff-byline">{byline}</div>
              <div className="staff-role">{role}</div>
              <div className="b-flexRow staff-contact">
                {phoneNumber && (
                  <>
                    <div className="staff-phone">{phoneNumber}</div>
                    <span></span>
                  </>
                )}
                {email && (
                  <div className="staff-email">
                    <a href={`mailto:${email}`}>Email</a>
                  </div>
                )}
              </div>
            </div>
            {(twitter || facebook) && (
              <div className="staff-social-icons">
                {facebook && (
                  <a href={facebook}>
                    <FacebookIcon />
                  </a>
                )}
                {twitter && (
                  <a href={twitter}>
                    <TwitterIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={`staff-bio ${badges.length > 0 ? 'hasBadges' : ''}`}>
          {longBio}
        </div>
        {badges.length > 0 && (
          <div className="c-staff-badges">
            <span>Contributes To:</span>
            <div className="staff-badges">{badges}</div>
          </div>
        )}
        <div className="b-flexRow tease-listHeading">Latest from {byline}</div>
      </div>
    </>
  );
};

StaffBio.label = 'Staff Bio';

export default StaffBio;
