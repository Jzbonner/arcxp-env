import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import fetchEnv from '../../global/utils/environment';
import Lead from '../../../features/Lead/default';

const EditorsPicks = ({ isAmp = false, arcSite }) => {
  if (isAmp) return null;

  const { editorsPicks } = getProperties(arcSite);
  const currentEnv = fetchEnv();
  const collectionId = editorsPicks[currentEnv];
  const customFields = {
    content: {
      contentConfigValues: {
        from: 0, size: 5, id: collectionId,
      },
      contentService: 'collections-api',
    },
  };

  return (
    <>
      <div className="mostReadTitle">Editors&#39; Picks</div>
      <div className="c-ttd-feature editors-picks">
        <Lead customFields={customFields} displayClassOverride={'5-Item TTD Feature'} />
      </div>
    </>
  );
};

EditorsPicks.propTypes = {
  isAmp: PropTypes.bool,
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
  arcSite: PropTypes.string,
};

EditorsPicks.defaultProps = {
  componentName: 'RelatedList',
  arcSite: 'ajc',
};

export default EditorsPicks;
