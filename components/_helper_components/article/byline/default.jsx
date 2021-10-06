import React from 'react';
import PropTypes from 'prop-types';
import { creditParser, handleAuthors, handleOrganization } from './utils';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';
import './default.scss';

const Byline = ({ by = [], sections, excludeOrg = false }) => {
  const sponsorContentLabel = getSponsorData(sections);
  const finalizeByline = (authors = []) => {
    const authorData = excludeOrg ? authors : handleOrganization(authors);
    return handleAuthors(authorData);
  };

  if (sponsorContentLabel) return <div className="byline ">By {sponsorContentLabel}</div>;
  return by.length ? <div className="byline ">{finalizeByline(by.map(creditParser))}</div> : null;
};

Byline.propTypes = {
  by: PropTypes.array,
  sections: PropTypes.array,
  excludeOrg: PropTypes.bool,
};

export default Byline;
