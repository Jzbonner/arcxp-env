import React from 'react';
import getProperties from 'fusion:properties';
import { useAppContext } from 'fusion:context';
import PropTypes from 'prop-types';
import checkTags from '../../../layouts/_helper_functions/checkTags';
import ImageSimple from '../imageSimple/default';
import './default.scss';

const ContributorBadge = ({ tags, ampPage, useWhiteLogos }) => {
  const { contextPath } = useAppContext();

  const hyperlocalTags = getProperties().hyperlocalTags.filter((tag) => {
    if (tag !== 'community contributor') {
      return tag;
    }
    return null;
  });

  function getContributorProps() {
    switch (checkTags(tags, hyperlocalTags)) {
      case 'alpharetta':
        return {
          link: '/neighborhoods/alpharetta',
          image: `/resources/images/contributors/alpharetta${useWhiteLogos ? '-white' : ''}.png`,
        };
      case 'roswell':
        return { link: '/neighborhoods/roswell', image: `/resources/images/contributors/roswell${useWhiteLogos ? '-white' : ''}.png` };
      case 'sandy springs':
        return {
          link: '/neighborhoods/sandy-springs',
          image: `/resources/images/contributors/sandy_springs${useWhiteLogos ? '-white' : ''}.png`,
        };
      case 'dunwoody':
        return { link: '/neighborhoods/dunwoody', image: `/resources/images/contributors/dunwoody${useWhiteLogos ? '-white' : ''}.png` };
      default:
        return { link: '/neighborhoods/', image: `/resources/images/contributors/community.png${useWhiteLogos ? '-white' : ''}` };
    }
  }

  if (checkTags(tags, 'community contributor')) {
    return (
      <a href={`${contextPath}${getContributorProps().link}`} className="c-contributorBadge b-margin-bottom-d40-m20">
        <ImageSimple
          src={getContributorProps().image}
          ampPage={ampPage}
          alt="Contributor Badge Logo"
          ampMobileHeight="54px"
          ampMobileMinWidth="300px"
        />
      </a>
    );
  }
  return null;
};

ContributorBadge.propTypes = {
  tags: PropTypes.array,
  ampPage: PropTypes.bool,
  useWhiteLogos: PropTypes.bool,
};

export default ContributorBadge;
