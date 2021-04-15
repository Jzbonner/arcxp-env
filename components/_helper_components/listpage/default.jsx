import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import checkTags from '../../layouts/_helper_functions/checkTags';
import ArcAd from '../../features/ads/default';
import Pagination from '../global/pagination/default';
import ListItem from '../home/ListItem/ListItem';
import './default.scss';
import '../../features/List/default';
import filter from '../../../content/filters/collectionTitle';

const RP01 = () => (
  <ArcAd staticSlot={'RP01-List-Page'} key={'RP01-List-Page'} />
);
const MP05 = () => <ArcAd staticSlot={'MP05'} key={'MP05'} />;

const ListPage = ({ globalContent, globalContentConfig, title }) => {
  const [activePage, setActivePage] = useState(1);

  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { query } = globalContentConfig || {};
  const { taxonomy } = globalContent;
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  const filterStart = parseInt(query.from, 10) - 1; // since the array is zero-indexed
  const filterSize = parseInt(query.size, 10);

  if (!globalContent) {
    return null;
  }

  const filteredStories = globalContent.slice(
    filterStart,
    filterStart + filterSize,
  );

  const collectionMetaData = useContent({
    source: 'collection-meta-data',
    query: {
      id: query && query.id,
      arcSite,
    },
    filter,
  });

  const { headlines: { basic: collectionTitle } = {} } = collectionMetaData || {};

  const storiesPerPage = 10;

  const getTitle = () => {
    if (title) {
      return title;
    }

    if (collectionTitle) {
      return (
        <div className="b-flexCenter b-flexRow tease-listHeading b-margin-bottom-d30-m20">
          {collectionTitle}
        </div>
      );
    }

    return null;
  };

  return (
    <main className="c-listPage b-contentMaxWidth">
      <div className="c-section with-rightRail b-sectionHome-padding">
        <div className="c-contentElements list-contentElements">
          {!noAds ? (
            <div className="c-rightRail list-rp01">{RP01()}</div>
          ) : null}
          <div className="b-flexCenter c-homeListContainer left-photo-display-class b-margin-bottom-d15-m10 one-column">
            {getTitle()}
            {filteredStories.map((el, i) => {
              const startIndex = (activePage - 1) * storiesPerPage;
              if (startIndex <= i && i < startIndex + storiesPerPage) {
                return <ListItem key={`key-${i}`} {...el} listPage={true} />;
              }
              return null;
            })}
            {filteredStories.length > storiesPerPage && (
              <Pagination
                activePage={activePage}
                setActivePage={setActivePage}
                totalStories={filteredStories.length}
                storiesPerPage={storiesPerPage}
                maxPagesToDisplay={5}
              />
            )}
          </div>
        </div>
      </div>
      {!noAds ? <div className="list-mp05">{MP05()}</div> : null}
    </main>
  );
};

ListPage.propTypes = {
  globalContent: PropTypes.array,
  globalContentConfig: PropTypes.object,
  title: PropTypes.func,
};

export default ListPage;
