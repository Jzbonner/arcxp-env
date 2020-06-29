import React, {
  useState, useEffect, useLayoutEffect, useRef,
} from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setEditingState] = useState(false);

  const inputRef = useRef(null);

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
    window.addEventListener('keydown', handleEnterPress, true);
    return () => {
      window.removeEventListener('keydown', handleEnterPress, true);
    };
  }, [searchTerm]);

  useLayoutEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  return (
    <li className='nav-search nav-itemBottomBorder'>
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
