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

const SearchPage = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  /* const noAds = checkTags(tags, 'no-ads');  uncommenting as this will be used when ads are set */
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pageCount, setPageCount] = useState(1);

  const [sortByDateState, setSortByDateState] = useState(false);
  const [storyEls, setStoryEls] = useState([]);

  const actions = {
    RELEVANCE: 'RELEVANCE',
    DATE: 'DATE',
  };

  let filteredTeases = null;

  function getListsByColumn(apiData, columnValue = 1) {
    const leftColumnLimit = (storyEls.length / 2) - 1;
    const rightColumnStartIndex = leftColumnLimit;
    return apiData.map((el, i) => {
      if (columnValue === 1 && i <= leftColumnLimit) {
        return <SearchItem key={`SearchItem-${i}`} {...el} listPage={true} />;
      }

      if (columnValue === 2 && i > rightColumnStartIndex) {
        return <SearchItem key={`SearchItem-${i}`} {...el} listPage={true} />;
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
    },
  });

  const buildSearchItems = () => {
    if (!storyEls) return null;

    const column1Output = getListsByColumn(storyEls, 1);
    const column2Output = getListsByColumn(storyEls, 2);

    return (
      <div className="c-searchListContainter two-column left-photo-display-class b-margin-bottom-d15-m10">
        {column1Output && <div className="column-1">{column1Output}</div>}
        <div className="tablet-line"></div>
        {column2Output && <div className="column-2">{column2Output}</div>}
      </div>
    );
  };

  const handleSortType = (sortType) => {
    setStoryEls([]);
    if (sortType === actions.DATE) setSortByDateState(true);
    if (sortType === actions.RELEVANCE) setSortByDateState(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setStoryEls([]);
    setSearchQuery(searchInput);
  };

  useEffect(() => {
    if (searchMetaData) {
      if (searchMetaData.data) {
        filteredTeases = AddFirstInlineImage(searchMetaData.data, 'list', ['list']);
        filteredTeases = updateImageRefs(filteredTeases);
      }

      if (filteredTeases) {
        if (storyEls.length === 0) {
          setStoryEls(filteredTeases);
        }

        if (storyEls.length > 1 && (pageCount !== searchMetaData && searchMetaData.metadata && parseInt(searchMetaData.metadata.page, 10))) {
          setStoryEls(oldArray => [...oldArray, ...filteredTeases]);
        }
      }
    }
  }, [searchMetaData]);


  return (
    <main className="c-listPage b-contentMaxWidth b-sectionHome-padding">
      <div className="c-search-bar">
        <div className="input-field">
          <img src={SearchIcon} width={20} height={21}/>
        <input
          type="text"
          id="searchInput"
          name="search"
          placeholder=""
          onChange={onChangeHandler}
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
          {buildSearchItems()}
          {<LoadMoreButton
            newStories={filteredTeases}
            handleOnClick={() => setPageCount(pageCount + 1)}
          />}
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
