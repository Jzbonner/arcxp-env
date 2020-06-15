import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import checkTags from '../../layouts/_helper_functions/checkTags';
import ArcAd from '../../features/ads/default';
import Pagination from '../global/pagination/default';
import ListItem from '../home/ListItem/ListItem';
import './default.scss';
import '../../features/List/default';

const RP01 = () => (
  <ArcAd staticSlot={'RP01-List-Page'} key={'RP01-List-Page'} />
);
const MP05 = () => <ArcAd staticSlot={'MP05'} key={'MP05'} />;

const ListPage = ({ globalContent, globalContentConfig }) => {
  const [activePage, setActivePage] = useState(1);

  const { query } = globalContentConfig || {};
  const { taxonomy } = globalContent;
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  const filterStart = parseInt(query.from, 10);
  const filterSize = parseInt(query.size, 10);

  const filteredStories = globalContent.slice(
    filterStart,
    filterStart + filterSize,
  );

  const collectionMetaData = useContent({
    source: 'collection-meta-data',
    query: {
      id: query && query.id,
    },
  });

  const { data } = collectionMetaData || {};
  const storiesPerPage = 5;

  return (
    <main className="c-listPage">
      <div className="c-section with-rightRail">
        <div className="c-contentElements list-contentElements">
          {!noAds ? (
            <div className="c-rightRail list-rp01">{RP01()}</div>
          ) : null}
          <div className="b-flexCenter c-homeListContainer left-photo-display-class b-margin-bottom-d15-m10 one-column">
            <div className="b-flexCenter b-flexRow tease-listHeading b-margin-bottom-d30-m20">
              {data && data.name}
            </div>
            <div>
              {filteredStories.map((el, i) => {
                const startIndex = (activePage - 1) * storiesPerPage;
                if (startIndex <= i && i < startIndex + storiesPerPage) {
                  return <ListItem key={`key-${i}`} {...el} listPage={true} />;
                }
                return null;
              })}
            </div>
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
};

export default ListPage;
