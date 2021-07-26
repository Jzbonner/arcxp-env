import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import arrow from '../../../resources/icons/slider/left-arrow.svg';

const LoadMoreButton = ({ numberOfNewStories = 0, handleOnClick }) => {
  const [buttonState, setButtonState] = useState('default');
  const [numberOfOldStories, setNumberOfOldStories] = useState(0);

  useEffect(() => {
    if (numberOfNewStories === numberOfOldStories) {
      setButtonState('data-max-reached');
    } else {
      setNumberOfOldStories(numberOfNewStories);
      setButtonState('default');
    }
  }, [numberOfNewStories]);

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
      {buttonState === 'default' && <>{'Load More'} <img className="arrow" src={arrow}/></>}
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
  numberOfNewStories: PropTypes.integer,
  handleOnClick: PropTypes.func,
};

export default LoadMoreButton;
