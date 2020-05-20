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
    firstName,
    lastName,
  } = staffer;
  return (
    <div className={'c-staff-card'}>
      <div className={'c-profile-picture'}>
        <img src={image || missingStaffIcon} alt={'staff image'} className={'profile-picture'}/>
      </div>
      <div className={'c-staff-info'}>
        <a href={`/staff/${`${firstName}-${lastName}`}/${id}/`} className={'name'}>{name}</a>
        <div className={'role'}>{role}</div>
        <div className={'phone-email'}>
          <a
            target="_self"
            href={`tel:${email}`}
            className={'phone'}
          >
            {telephone}
          </a>
          {telephone && email && <span className={'divider'}>|</span>}
          <a
            target="_self"
            href={`mailto:${email}`}
            className={'email'}
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

StaffCard.propTypes = {
  staffer: PropTypes.object,
};

export default StaffCard;
