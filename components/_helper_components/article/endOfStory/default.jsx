import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import fetchEnv from '../../global/utils/environment';
import EditorsPicks from '../editorsPicks/default';
import Investigations from '../investigations/default';
import getLists from '../../../layouts/_helper_functions/article/getLists';
import filterDuplicateStory from '../sponsorRelatedBox/_helper_functions/filterDuplicateStory';
import filterByPrimarySection from '../../../../content/sources/helper_functions/filterByPrimarySection';
import '../../../features/Lead/default.scss';
import '../investigations/default.scss';

const EndOfStory = ({ arcSite, taxonomy, uuid }) => {
  const { editorsPicks, investigations } = getProperties(arcSite);
  const currentEnv = fetchEnv();
  const editorsId = editorsPicks[currentEnv];
  const investigationsId = investigations[currentEnv];

  const { primary_section: primarySection } = taxonomy || {};
  const { path, referent } = primarySection || {};
  const { id: referentId } = referent || {};
  let contentData = null;
  let primaryData = null;
  let finalReferentId;

  if (referentId) {
    [, finalReferentId] = referentId.split('/');
  }

  const formattedPath = path ? path.substring(1) : finalReferentId || null;
  const data = useContent({
    source: 'search-api',
    query: {
      published: true,
      section: formattedPath,
      sort: true,
      size: 30,
    },
  });

  if (data && data.content_elements && data.content_elements.length > 1) {
    contentData = filterDuplicateStory(data.content_elements, uuid);
    primaryData = filterByPrimarySection(contentData, formattedPath);
  } else {
    return null;
  }

  return (
    <>
      <EditorsPicks arcSite={arcSite} collectionId={editorsId} />
      <div className="b-flexRow b-flexColumn -mobile">
        <div className="endOfStory">
          <div className="mostReadTitle">The Latest</div>
          <div className="c-homeLeadContainer left-photo-no-photo-display-class one-column">
            <div className="column-1">{getLists(primaryData, 0, 3, 3, true, 'Redesign Feature - Left Photo No Photo', false)}</div>
          </div>
        </div>
        <Investigations arcSite={arcSite} collectionId={investigationsId}/>
      </div>
    </>
  );
};
EndOfStory.propTypes = {
  arcSite: PropTypes.string,
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
};

export default EndOfStory;
