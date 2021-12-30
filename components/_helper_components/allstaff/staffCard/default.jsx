import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import missingStaffIcon from '../../../../resources/icons/staff/missing-staff-avatar.svg';

export const StaffCard = ({ staffer = {} }) => {
  const {
    custom_ajc_phone: telephone,
    _id: id,
    byline: name,
    role,
    email,
    image,
  } = staffer;

  const staffBioPageLink = `/staff/${id}/`;
  return (
    <div className={'c-staff-card'}>
      <a
        href={staffBioPageLink}
        className={'c-profile-picture'}
      >
        <img src={image || missingStaffIcon} alt={`${image ? `${name} profile picture` : 'silhoutte image'}`} className={'profile-picture'}/>
      </a>
      <div className={'c-staff-info'}>
        <a href={staffBioPageLink} className={'name'} rel="author">{name}</a>
        <div className={'role'}>{role}</div>
        <div className={'phone-email'}>
          { telephone && <a
            target="_self"
            href={`tel:${email}`}
            className={'phone'}
          >
            {telephone}
          </a> }
          {telephone && email && <span className={'divider'}>|</span>}
          { email && <a
            target="_self"
            href={`mailto:${email}`}
            className={'email'}
          >
            Email
          </a> }
        </div>
      </div>
    </div>
  );
};

StaffCard.propTypes = {
  staffer: PropTypes.object,
};

export default StaffCard;
