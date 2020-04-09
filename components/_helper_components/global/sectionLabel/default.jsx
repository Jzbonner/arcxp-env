import React from 'react';
import PropTypes from 'prop-types';
import getTeaseLabel from './_helper_functions/getTeaseLabel';
import './default.scss';

const sectionLabel = ({ taxonomy, label, ampPage = false }) => {
  if (ampPage) return null;

  const { primary_section: primarySection } = taxonomy || {};
  const { path: pathPrimary, name: namePrimary } = primarySection || {};
  const { custom_label: customLabel } = label || {};
  const { text: nameCustom } = customLabel || {};
  let teaseLabel = null;

  if (nameCustom) {
    return <span className="section-label">{nameCustom}</span>;
  }

  if (!nameCustom && !namePrimary) teaseLabel = getTeaseLabel(taxonomy, nameCustom);

  return (
    <a className="section-label section-label-link" href={pathPrimary}>
      {namePrimary || teaseLabel}
    </a>
  );
};

sectionLabel.propTypes = {
  taxonomy: PropTypes.object.isRequired,
  label: PropTypes.object.isRequired,
  ampPage: PropTypes.bool,
};

export default sectionLabel;
