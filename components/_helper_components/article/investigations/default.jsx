import React from 'react';
import PropTypes from 'prop-types';
import Lead from '../../../features/Lead/default';
import '../relatedList/default.scss';
import '../../../features/MostRead/default.scss';
import './default.scss';

const Investigations = ({ collectionId }) => {
  const customFields = {
    content: {
      contentConfigValues: {
        from: 0, size: 3, id: collectionId,
      },
      contentService: 'collections-api',
      title: 'Investigations',
    },
  };

  return (
    <div className="endOfStory">
        <div className="mostReadTitle">Featured</div>
        <Lead customFields={customFields} limitOverride={3} displayClassOverride={'Redesign Feature - Left Photo No Photo'} />
    </div>
  );
};

Investigations.propTypes = {
  collectionId: PropTypes.string,
};

Investigations.defaultProps = {
  componentName: 'Investigations',
};

export default Investigations;
