import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import fetchEnv from '../../global/utils/environment';
import Lead from '../../../features/Lead/default';
import '../relatedList/default.scss';
import '../../../features/MostRead/default.scss';

const EditorsPicks = ({ arcSite }) => {
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
  arcSite: PropTypes.string,
};

EditorsPicks.defaultProps = {
  componentName: 'EditorsPicks',
  arcSite: 'ajc',
};

export default EditorsPicks;
