import React from 'react';
import PropTypes from 'prop-types';
import Lead from '../../../features/Lead/default';
import '../relatedList/default.scss';
import '../../../features/MostRead/default.scss';

const EditorsPicks = ({ collectionId }) => {
  const useSophi = true;

  const customFields = {
    content: {
      contentConfigValues: {
        from: useSophi ? 1 : 0, size: 5, id: collectionId, page: 'home', widget: 'local',
      },
      contentService: useSophi ? 'sophi' : 'collections-api',
    },
  };

  return (
    <>
      <div className="mostReadTitle">Editors&#39; Picks</div>
      <div className="c-ttd-feature editors-picks">
        <Lead customFields={customFields} displayClassOverride={'5-Item TTD Feature'} filterData={true}/>
      </div>
    </>
  );
};

EditorsPicks.propTypes = {
  collectionId: PropTypes.string,
};

EditorsPicks.defaultProps = {
  componentName: 'EditorsPicks',
};

export default EditorsPicks;
