import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import './default.scss';
import '../../features/List/default';
import AddFirstInlineImage from '../../../content/sources/helper_functions/AddFirstInlineImage';
import LoadMoreButton from '../loadMoreBtn/default';
import SearchItem from './_helper_components/SearchItem';
import SearchIcon from '../../../resources/icons/search.svg';
import ArcAd from '../../features/ads/default';
import checkTags from '../../layouts/_helper_functions/checkTags';

const RP01 = () => <ArcAd staticSlot={'RP01-List-Page'} key={'RP01-List-Page'} />;
const RP09 = i => <ArcAd staticSlot={'RP09 sticky listPage'} key={`RP09-List-Page-${i}`} customId={`div-id-RP09_${i}`} />;
const MP05 = i => <ArcAd staticSlot={'MP05'} key={`MP05-${i / 10}`} customId={`div-id-MP05_${i / 10}`} />;
const HP05 = i => <ArcAd staticSlot={'HP05'} key={`HP05-${i / 10}`} customId={`div-id-HP05_${i / 10}`} />;

const SearchPage = ({
  globalContent,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const { taxonomy } = globalContent;
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pageCount, setPageCount] = useState(1);
  const [sortByDateState, setSortByDateState] = useState(false);
  const [storyEls, setStoryEls] = useState([]);
  const [columnSets, setColumnSets] = useState([]);
  const [adIndex, setAdIndex] = useState(1);
  const [mapStartIndex, setMapStartIndex] = useState(0);
  const RP01RP09Array = [];

  const RP01Count = storyEls.length / 10;

  for (let i = 0; i < RP01Count; i += 1) {
    if (i === 0) {
      RP01RP09Array.push(
        (
          <div className="RP01-container">
            { RP01() }
          </div>
        ),
      );
    } else {
      RP01RP09Array.push(
        (
          <div className="RP01-container">
            { RP09((i)) }
          </div>
        ),
      );
    }
  }

  const actions = {
    RELEVANCE: 'RELEVANCE',
    DATE: 'DATE',
  };

  let filteredTeases = null;

  function getListsByColumn(apiData, columnValue = 1) {
    const newSearchData = apiData.slice(mapStartIndex);
    const leftColumnLimit = (newSearchData.length / 2) - 1;
    const rightColumnStartIndex = leftColumnLimit;
    return newSearchData.map((el, i) => {
      const f = i + 2;
      if (i !== 0 && (i + 1) % 10 === 0 && columnValue === 2 && !noAds) {
        return (<>
          <SearchItem key={`SearchItem-${i}`} {...el} listPage={true} noBorder={true} />
        </>);
      // eslint-disable-next-line no-else-return
      } else {
        if (columnValue === 1 && i <= leftColumnLimit) {
          return <SearchItem key={`SearchItem-${i}`} {...el} listPage={true} noBorder={f % 10 === 0} />;
        }

        if (columnValue === 2 && i > rightColumnStartIndex) {
          return <SearchItem key={`SearchItem-${i}`} {...el} listPage={true} noBorder={f % 10 === 0} />;
        }
      }
      return null;
    });
  }

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

  const searchMetaData = useContent({
    source: 'search-page',
    query: {
      q: `${searchQuery}`,
      page: pageCount,
      arcSite,
      sortByDate: sortByDateState,
    },
  });

  const buildSearchItems = () => {
    if (!storyEls) return null;

    const column1Output = storyEls !== 'no-results' ? getListsByColumn(storyEls, 1) : <div className="no-results-text">We could not find anything related to your search. Please try your search again.</div>;
    const column2Output = storyEls !== 'no-results' ? getListsByColumn(storyEls, 2) : null;
    const currentAdIndex = adIndex;

    return (
      <>
      <div className={`c-searchListContainter two-column left-photo-display-class ${storyEls === 'no-results' ? 'no-results' : ''}`}>
        {column1Output && <div className="column-1">{column1Output}</div>}
        <div className="tablet-line"></div>
        {column2Output && <div className="column-2">{column2Output}</div>}
      </div>
      <div className="list-mp05">{MP05(currentAdIndex)}</div>
      <div className="list-hp05"><div className="hp05-line"/>{HP05(currentAdIndex)}</div>
      </>
    );
  };

  const handleColumnSet = () => {
    const newColumnSet = buildSearchItems();

    const colArray = [newColumnSet];

    setColumnSets(currentSets => [...currentSets, ...colArray]);
  };

  const resetStates = () => {
    setStoryEls([]);
    setColumnSets([]);
    setAdIndex(1);
    setMapStartIndex(0);
    setPageCount(1);
  };

  const handleSortType = (sortType) => {
    resetStates();
    if (sortType === actions.DATE) setSortByDateState(true);
    if (sortType === actions.RELEVANCE) setSortByDateState(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    /* searching with a new query means a new story set
    (and therefore, new column sets) - so, reset the states */
    resetStates();
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    if (searchMetaData) {
      if (searchMetaData?.data.length > 0) {
        filteredTeases = AddFirstInlineImage(searchMetaData.data, 'list', ['list']);
        filteredTeases = updateImageRefs(filteredTeases);
      } else {
        setStoryEls('no-results');
      }

      if (filteredTeases) {
        if (storyEls.length === 0) {
          setStoryEls(filteredTeases);
        }

        if (storyEls.length > 1 && (pageCount !== searchMetaData && searchMetaData.metadata && parseInt(searchMetaData.metadata.page, 10))) {
          setMapStartIndex(storyEls.length);
          setStoryEls(oldArray => [...oldArray, ...filteredTeases]);
        }
      }
    }
  }, [searchMetaData]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      resetStates();
      setSearchQuery(searchInput);
    }
  };

  useEffect(() => {
    if (storyEls.length > 1) handleColumnSet();
  }, [storyEls]);

  useEffect(() => {
    if (columnSets.length >= 1) setAdIndex(adIndex + 1);
  }, [columnSets]);

  return (
    <main className="c-listPage b-contentMaxWidth b-sectionHome-padding">
      <div className="c-search-bar">
        <div className="input-field">
          <img src={SearchIcon} width={20} height={21} />
          <input
            type="text"
            id="searchInput"
            name="search"
            placeholder=""
            onChange={onChangeHandler}
            onKeyDown={handleKeyDown}
            value={searchInput}></input>
        </div>
        <button onClick={handleButtonClick} className="search-btn">Search</button>
      </div>
      <div className="c-search-sortType">
        <span className="sort-header">Filter: </span>
        <span className={`sort-score ${(!sortByDateState && 'default-active') || ''}`} onClick={() => handleSortType(actions.RELEVANCE)}>Relevance</span>
        <span>|</span>
        <span className={`sort-date ${(sortByDateState && 'default-active') || ''}`} onClick={() => handleSortType(actions.DATE)}>Date</span>
      </div>
      <div className="c-section with-rightRail">
        <div className="c-contentElements list-contentElements">
          {columnSets.length >= 1 && columnSets.map(el => el)}
          {columnSets.length >= 1
          && searchMetaData
          && searchMetaData.data
          && searchMetaData.data.length >= 10
          && <LoadMoreButton
            isSearch={true}
            columnSets={columnSets}
            handleOnClick={() => setPageCount(pageCount + 1)}
          />}
        </div>
        {!noAds ? (
          <div className="c-list-right-rail">
            {
              RP01RP09Array.map(el => el)
            }
          </div>
        ) : null}
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
