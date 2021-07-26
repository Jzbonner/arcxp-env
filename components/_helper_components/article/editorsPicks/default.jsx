import React from 'react';
import PropTypes from 'prop-types';
import Lead from '../../../features/Lead/default';

const EditorsPicks = ({ isAmp = false }) => {
  const customFields = {
    content: {
      contentConfigValues: {
        size: 5, from: 0, id: 'GUEX7HW5GBDINAZZF2ETEB5YQ4',
      },
      contentService: 'collections-api',
    },
  };

  console.log(isAmp);

  return (
    <>
      <Lead customFields={customFields} displayClassOverride={'7-Item TTD Feature'} />
    </>
  );
};

EditorsPicks.propTypes = {
  isAmp: PropTypes.bool,
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
};

EditorsPicks.defaultProps = {
  componentName: 'RelatedList',
};

export default EditorsPicks;
