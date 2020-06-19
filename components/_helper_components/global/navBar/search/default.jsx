import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search/?q=${searchTerm}`;
  };

  return (
    <li className='nav-search nav-itemBottomBorder'>
      <form onSubmit={handleSubmit} className='search-form'>
        <input
          onChange={handleChange}
          type="text"
          name="value"
          value={searchTerm}
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
