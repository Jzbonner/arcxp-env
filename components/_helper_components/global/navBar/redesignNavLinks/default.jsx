import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';

const RedesignNavLinks = ({ sections, arcSite }) => {
  const { siteDomainURL } = getProperties(arcSite);
  const items = sections.map((section, i) => {
    const {
      _id: id,
      navigation,
    } = section || {};

    const {
      nav_title: title,
    } = navigation || {};

    return (
    <li key={i}>
      <a href={id.indexOf('/') === 0 ? `${siteDomainURL}${id}` : id} target='_self' className="nav-itemText">{title}</a>
    </li>
    );
  });
  return (
    <ul>
      {items}
    </ul>
  );
};

RedesignNavLinks.propTypes = {
  sections: PropTypes.array,
  arcSite: PropTypes.string,
};

export default RedesignNavLinks;
