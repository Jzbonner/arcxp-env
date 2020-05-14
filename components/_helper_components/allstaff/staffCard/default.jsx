import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import missingStaffIcon from '../../../../resources/icons/staff/missing-staff-avatar.svg';

export const StaffCard = ({
  name, role, telephone, email, image,
}) => (
  <div className={'c-staff-card'}>
    <div className={'c-profile-picture'}>
      <img src={image || missingStaffIcon} alt={'staff image'} className={'profile-picture'}/>
    </div>
    <div className={'c-staff-info'}>
      <h2 className={'name'}>{name}</h2>
      <div className={'role'}>{role}</div>
      <div className={'phone-email'}>
        <a
          target="_self"
          href={`tel:${email}`}
          className={'phone'}
        >
          {telephone}
        </a>
        { telephone && email && <span className={'divider'}>|</span> }
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

StaffCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  telephone: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.string,
};

export default StaffCard;