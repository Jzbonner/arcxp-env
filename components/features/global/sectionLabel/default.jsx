import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const sectionLabel = ({ content }) => {
  const {
    taxonomy: {
      primary_section: { path: pathPrimary, name: namePrimary },
    },
    label: { custom_label: { text: nameCustom } = {} },
  } = content || {};

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
  content: PropTypes.object.isRequired,
};

export default sectionLabel;
