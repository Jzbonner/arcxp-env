import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import arrow from '../../../resources/icons/slider/left-arrow.svg';

const LoadMoreButton = ({
  numberOfNewStories = 0, handleOnClick, newStories, isSearch = false, columnSets = [],
}) => {
  const [buttonState, setButtonState] = useState('default');
  const [numberOfOldStories, setNumberOfOldStories] = useState(0);
  const [columnSetCount, setColumnSetCount] = useState(0);

  useEffect(() => {
    if (numberOfNewStories && !isSearch) {
      if (numberOfNewStories === numberOfOldStories) {
        setButtonState('data-max-reached');
      } else {
        setNumberOfOldStories(numberOfNewStories);
        setButtonState('default');
      }
    }
    if (newStories && !isSearch) {
      if (newStories?.length === numberOfOldStories) {
        setButtonState('data-max-reached');
      } else {
        setNumberOfOldStories(newStories?.length);
        setButtonState('default');
      }
    }

    if (isSearch) {
      if (buttonState === 'data-loading' && columnSetCount !== columnSets.length) {
        setColumnSetCount(columnSets.length);
        setButtonState('default');
      }
    }
  }, [numberOfNewStories, newStories, columnSetCount, columnSets]);

  const handleBtnClick = () => {
    if (buttonState !== 'data-max-reached') {
      setButtonState('data-loading');
      if (handleBtnClick) {
        handleOnClick();
      }
    }
  };

  return (
    <button className={`btn-loadMore  b-margin-bottom-d30-m20 ${buttonState}`} onClick={handleBtnClick}>
      {buttonState === 'default' && <>{'Load More'} <img className="arrow" src={arrow} /></>}
      {buttonState === 'data-max-reached' && 'No More Results'}
      {buttonState === 'data-loading' && (
        <>
          {'Loading'}
          <span className="spinner-blob"></span>
        </>
      )}
    </button>
  );
};

LoadMoreButton.propTypes = {
  numberOfNewStories: PropTypes.number,
  handleOnClick: PropTypes.func,
  newStories: PropTypes.array,
  isSearch: PropTypes.bool,
  newSearchPageNumber: PropTypes.number,
  columnSets: PropTypes.array,
};

export default LoadMoreButton;
