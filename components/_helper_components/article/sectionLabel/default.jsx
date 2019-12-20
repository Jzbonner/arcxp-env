import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const sectionLabel = ({ taxonomy, label }) => {
  const {
    primary_section: { path: pathPrimary, name: namePrimary },
  } = taxonomy || {};

  let nameCustom;

  if (label.custom_label) {
    nameCustom = label.custom_label.text;
  }

  if (nameCustom) {
    return <span className="section-label">{nameCustom}</span>;
  }

  return (
    <a className="section-label section-label-link" href={pathPrimary}>
      {namePrimary}
    </a>
  );
};

sectionLabel.propTypes = {
  taxonomy: PropTypes.object.isRequired,
  label: PropTypes.object.isRequired,
};

export default sectionLabel;
