import React, {
  useState, useEffect, useLayoutEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';
import searchIcon from '../../../../../resources/icons/search.svg';
import searchBurger from '../../../../../resources/icons/search-burger.svg';
/* eslint-disable max-len */

const Search = ({ isHeader, isSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setEditingState] = useState(false);
  const [isTablet, setTabletState] = useState(false);

  const inputRef = useRef(null);
  const windowExists = typeof window !== 'undefined';

  const handleWindowSize = () => {
    if (window.innerWidth <= 1023) {
      setTabletState(true);
    } else {
      setTabletState(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search/?q=${searchTerm}`;
  };

  if (isHeader) {
    return (
      <button onClick={e => e.target && handleSubmit(e)}type="submit" className="c-headerIcon">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="21" height="22" viewBox="0 0 21 22"> <defs> <path id="9x66zu0qra" d="M0.003 0.021L17.596 0.021 17.596 18.411 0.003 18.411z"/> </defs> <g fill="none" fillRule="evenodd"> <g> <g> <g> <g> <g transform="translate(-1574 -125) translate(60 20) translate(0 86) translate(1514 19)"><path fill="#212126" d="M8.798 17.491C4.432 17.491.88 13.78.88 9.216.88 4.653 4.432.94 8.798.94s7.918 3.713 7.918 8.276-3.552 8.275-7.918 8.275zm0-17.47C3.947.02 0 4.146 0 9.216s3.947 9.195 8.798 9.195 8.798-4.125 8.798-9.195S13.649.02 8.798.02z" mask="url(#3218e5xuab)"/> </g> <path fill="#212126" d="M16.258 16.924L16.761 16.323 21 21.398 20.497 22 16.258 16.924" transform="translate(-1574 -125) translate(60 20) translate(0 86) translate(1514 19)"/> </g> </g> </g> </g> </g> </svg>
      </button>
    );
  }

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) handleSubmit();
  };

  const toggleEditing = () => {
    setEditingState(!isEditing);
  };

  // check viewport size on mount
  useEffect(() => {
    if (windowExists) handleWindowSize();
  }, []);

  useEffect(() => {
    if (windowExists) {
      window.addEventListener('keydown', handleEnterPress, true);
      return () => {
        window.removeEventListener('keydown', handleEnterPress, true);
      };
    }
    return null;
  }, [searchTerm]);

  useEffect(() => {
    if (windowExists) {
      window.addEventListener('resize', handleWindowSize, true);
      return () => {
        window.removeEventListener('resize', handleWindowSize, true);
      };
    }
    return null;
  }, [isTablet]);

  useLayoutEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  return (
    <div className={`nav-search ${isSidebar ? 'burger-search' : ''}`}>
      <form onSubmit={e => e.target && handleSubmit(e)} className='search-form'>
        {
          isTablet && (
            <input
            onClick={toggleEditing}
            onChange={handleChange}
            type="text"
            name="value"
            value={searchTerm}
            ref={inputRef}
            className='search-input'></input>
          )
        }
        <button type="submit" className="c-search-icon">
          <img className='search-icon'
            src={isSidebar ? searchBurger : searchIcon}
            alt='Search icon'/>
        </button>
      </form>
    </div>

  );
};

Search.propTypes = {
  isHeader: PropTypes.bool,
  isSidebar: PropTypes.bool,
};

export default Search;
