import React from 'react';
import PropTypes from 'prop-types';
import getTeaseLabel from './_helper_functions/getTeaseLabel';
import './default.scss';

const sectionLabel = ({
  taxonomy, label, ampPage = false, sponsorContentLabel,
}) => {
  if (ampPage && !sponsorContentLabel) return null;

  const { primary_section: primarySection } = taxonomy || {};
  const { path: pathPrimary, name: namePrimary, referent = {} } = primarySection || {};
  const { id = '' } = referent;

  const { custom_label: customLabel } = label || {};
  const { text: nameCustom } = customLabel || {};

  // eslint-disable-next-line no-useless-escape
  const pathRegTest = /([a-zA-Z0-9]+\.[a-zA-Z]+|[0-9\.]+|[a-zA-Z0-9]+)(?=\/)/;

  let teaseLabel = null;
  let labelFromPath = null;

  if (nameCustom) {
    return <span className="section-label">{nameCustom}</span>;
  }

  // case where label returns basic: { text }
  if (!nameCustom && !namePrimary && label && label.basic && label.basic.text) {
    return <span className="section-label">{getTeaseLabel(taxonomy, label)}</span>;
  }

  // no custom label or section name, check sections array
  if (!nameCustom && !namePrimary) teaseLabel = getTeaseLabel(taxonomy, label);

  // if can't find label or custom label anywhere, get label from top level id
  if (!nameCustom && !namePrimary && !teaseLabel && id) {
    const resultArr = pathRegTest.exec(id);
    const [firstResult] = resultArr || [];
    labelFromPath = firstResult || null;
  }

  if (sponsorContentLabel !== null) {
    return (
      <p className="section-label">
        ADVERTISER CONTENT
      </p>
    );
  }
  return (
    <a className="section-label section-label-link" href={pathPrimary}>
      {namePrimary || teaseLabel || labelFromPath}
    </a>
  );
};

sectionLabel.propTypes = {
  taxonomy: PropTypes.object.isRequired,
  label: PropTypes.object.isRequired,
  ampPage: PropTypes.bool,
  sponsorContentLabel: PropTypes.string,
};

export default sectionLabel;
