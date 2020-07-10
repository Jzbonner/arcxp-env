import React, {
  useState, useEffect, useLayoutEffect, useRef,
} from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setEditingState] = useState(false);

  const inputRef = useRef(null);
  const windowExists = typeof window !== 'undefined';

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

  useEffect(() => {
    const queryLocation = window.location.href.search('/?q=');
    const query = queryLocation !== -1 ? window.location.href.slice(queryLocation + 2) : '';
    setSearchTerm(query);
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

  useLayoutEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  return (
    <li className='nav-search'>
      <form onSubmit={handleSubmit} className='search-form'>
        <input
          onClick={toggleEditing}
          onChange={handleChange}
          type="text"
          name="value"
          value={searchTerm}
          ref={inputRef}
          className='search-input'></input>
        <button type="submit" className="c-search-icon">
          <img className='search-icon'
            src='https://www.ajc.com/r/PortalConfig/np-ajc/assets-one/images/icons/search-icon.svg' />
        </button>
      </form>
    </li>

  );
};

export default Search;
