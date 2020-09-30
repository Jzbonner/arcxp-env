import React from 'react';
import PropTypes from 'prop-types';
import { creditParser, handleAuthors, handleOrganization } from './utils';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';
import './default.scss';

const Byline = ({ by = [], sections }) => {
  const sponsorContentLabel = getSponsorData(sections);
  const finalizeByline = (authors = []) => handleAuthors(handleOrganization(authors));

  if (sponsorContentLabel) return <div className="byline b-margin-bottom-d40-m20">By {sponsorContentLabel}</div>;
  return by.length ? <div className="byline b-margin-bottom-d40-m20">{finalizeByline(by.map(creditParser))}</div> : null;
};

Byline.propTypes = {
  by: PropTypes.array,
  sections: PropTypes.array,
};

export default Byline;
