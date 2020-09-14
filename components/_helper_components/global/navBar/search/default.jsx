import React, {
  useState, useEffect, useLayoutEffect, useRef,
} from 'react';
import searchIcon from '../../../../../resources/icons/search.svg';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setEditingState] = useState(false);
  const [isTablet, setTabletState] = useState(false);

  const inputRef = useRef(null);
  const windowExists = typeof window !== 'undefined';

  const getWindowSize = () => {
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

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) handleSubmit();
  };

  const toggleEditing = () => {
    setEditingState(!isEditing);
  };

  // check viewport size on mount
  useEffect(() => {
    if (windowExists) getWindowSize();
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
      window.addEventListener('resize', getWindowSize, true);
      return () => {
        window.removeEventListener('resize', getWindowSize, true);
      };
    }
    return null;
  }, [isTablet]);

  useLayoutEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  return (
    <li className='nav-search'>
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
            src={searchIcon} />
        </button>
      </form>
    </li>

  );
};

export default Search;
