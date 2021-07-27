import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import checkTags from '../../layouts/_helper_functions/checkTags';
import ArcAd from '../../features/ads/default';
import './default.scss';
import '../../features/List/default';
import filter from '../../../content/filters/search-page';
import AddFirstInlineImage from '../../../content/sources/helper_functions/AddFirstInlineImage';
import LoadMoreButton from '../loadMoreBtn/default';
import SearchItem from './_helper_components/SearchItem';

const RP01 = () => (
  <ArcAd staticSlot={'RP01-List-Page'} key={'RP01-List-Page'} />
);
const MP05 = () => <ArcAd staticSlot={'MP05'} key={'MP05'} />;

const SearchPage = ({
  globalContent,
  globalContentConfig,
  textBox,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { query } = globalContentConfig || {};
  const { taxonomy } = globalContent;
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  const storiesPerLoad = 10;
  const [storiesCount, setStoryCount] = useState(storiesPerLoad);
  const [searchInput, setSearchInput] = useState('');
  const [sortByDateState, setSortByDateState] = useState(false);


/*   const filteredStories = globalContent.slice(0, storiesCount);
  const moreStoriesToLoad = !!(globalContent?.length - filteredStories?.length); */

  const actions = {
    RELEVANCE: 'RELEVANCE',
    DATE: 'DATE',
  };

  const onChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  const updateImageRefs = (apiData) => {
    const newData = apiData;
    apiData.forEach((el, e) => {
      if (el.type === 'story') {
        if (el.promo_items
          && el.promo_items.basic
          && el.promo_items.basic.promo_image
          && el.promo_items.basic.promo_image.url
        ) {
          newData[e].teaseImageObject = el.promo_items.basic.promo_image;
        }
        if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
          newData[e].teaseImageObject = el.promo_items.basic;
        }

        if (
          (el.promo_items && el.promo_items.basic && el.promo_items.basic.type === 'video')
          || (el.promo_items && el.promo_items.basic && el.promo_items.basic.type === 'gallery')
        ) {
          if (el.promo_items.basic.promo_items && el.promo_items.basic.promo_items.basic && el.promo_items.basic.promo_items.basic.url) {
            newData[e].teaseImageObject = el.promo_items.basic.promo_items.basic;
          }
        }

        if (el.firstInlineImage) {
          newData[e].teaseImageObject = el.firstInlineImage;
        }
      }
      if (el.type === 'video' || el.type === 'gallery') {
        if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
          newData[e].teaseImageObject = el.promo_items.basic;
        }
      }
    });
    return newData;
  };

/*   let filteredTeases = AddFirstInlineImage(filteredStories, 'list', ['list']);
  filteredTeases = updateImageRefs(filteredTeases); */


  const searchMetaData = useContent({
    source: 'search-page',
    query: {
      q: 'biden',
      page: 1,
      arcSite,
    },
  });

  console.log('search meta data', searchMetaData.data);

  let filteredTeases = AddFirstInlineImage(searchMetaData.data, 'list', ['list']);
  filteredTeases = updateImageRefs(filteredTeases);
  console.log('filtered teases', filteredTeases);

  const handleSortType = (sortType) => {
    if (sortType === actions.DATE) setSortByDateState(true);
    if (sortType === actions.RELEVANCE) setSortByDateState(false);
  };

  return (
    <main className="c-listPage b-contentMaxWidth b-sectionHome-padding">
      <div className="c-search-bar">
        <div className="input-field">
        <input
          type="text"
          id="searchInput"
          name="search"
          placeholder=""
          onChange={onChangeHandler}
          value={searchInput}></input>
          </div>
        <button className="search-btn">Search</button>
      </div>
      <div className="c-search-sortType">
        <span className="sort-header">Filter: </span>
        <span className={`sort-score ${(!sortByDateState && 'default-active') || ''}`} onClick={() => handleSortType(actions.RELEVANCE)}>Relevance</span>
        <span>|</span>
        <span className={`sort-date ${(sortByDateState && 'default-active') || ''}`} onClick={() => handleSortType(actions.DATE)}>Date</span>
      </div>
      <div className="c-section with-rightRail">
        <div className="c-contentElements list-contentElements">
          {!noAds ? (
            <div className="c-rightRail list-rp01 list-page-right-rail">{RP01()}</div>
          ) : null}
          <div className="b-flexCenter c-homeListContainer left-photo-display-class b-margin-bottom-d15-m10 one-column two-column-mobile">
            <div className="tablet-line"></div>
            {/*             {getNewsTipText('desktop')} */}
            {filteredTeases.map((el, i) => <SearchItem key={`key-${i}`} {...el} listPage={true} />)}
          </div>
          {/*           {moreStoriesToLoad && <LoadMoreButton
            newStories={filteredStories}
            handleOnClick={() => setStoryCount(storiesCount + storiesPerLoad)}
          />} */}
        </div>
      </div>
    </main>
  );
};

SearchPage.propTypes = {
  globalContent: PropTypes.object,
  globalContentConfig: PropTypes.object,
  title: PropTypes.object,
  textBox: PropTypes.func,
};

export default SearchPage;
