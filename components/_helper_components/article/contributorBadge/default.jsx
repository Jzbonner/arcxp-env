import React from 'react';
import getProperties from 'fusion:properties';
import PropTypes from 'prop-types';
import checkTags from '../../../layouts/_helper_functions/checkTags';
import './default.scss';

const ContributorBadge = ({ tags, deployment, contextPath }) => {
  const hyperlocalTags = getProperties().hyperlocalTags.filter((tag) => {
    if (tag !== 'community contributor') {
      return tag;
    }
    return null;
  });

  function getContributorProps() {
    switch (checkTags(tags, hyperlocalTags)) {
      case 'alpharetta':
        return { link: '/neighborhoods/alpharetta', image: '/resources/images/contributors/alpharetta.png' };
      case 'roswell':
        return { link: '/neighborhoods/roswell', image: '/resources/images/contributors/roswell.png' };
      case 'sandy springs':
        return { link: '/neighborhoods/sandy-springs', image: '/resources/images/contributors/sandy_springs.png' };
      case 'dunwoody':
        return { link: '/neighborhoods/dunwoody', image: '/resources/images/contributors/dunwoody.png' };
      default:
        return { link: '/neighborhoods/', image: '/resources/images/contributors/community.png' };
    }
  }

  if (checkTags(tags, 'community contributor')) {
    return (
      <a href={`${contextPath}${getContributorProps().link}`} className="c-contributorBadge b-margin-bottom-d40-m20">
        <img src={deployment(`${contextPath}${getContributorProps().image}`)} alt="Contributor Badge Logo" />
      </a>
    );
  }
  return null;
};

ContributorBadge.propTypes = {
  tags: PropTypes.array,
  deployment: PropTypes.func,
  contextPath: PropTypes.string,
};

export default ContributorBadge;
