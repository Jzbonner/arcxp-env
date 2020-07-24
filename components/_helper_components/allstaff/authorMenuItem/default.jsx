import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const AuthorMenuItem = ({
  selectedLeftMenuItem,
  area,
  setCategory,
  pageUri,
}) => <li
  key={area.name}
  className={`c-author-menu-item ${
    area.id === selectedLeftMenuItem.id ? 'active' : ''}`}>
    <a
      href={`/${pageUri}/${area.tag}`}
      onClick={e => setCategory(e, area)}>
      {area.name}
    </a>
  </li>;

AuthorMenuItem.propTypes = {
  setCategory: PropTypes.func,
  selectedLeftMenuItem: PropTypes.object,
  area: PropTypes.object,
  pageUri: PropTypes.string,
};

export default AuthorMenuItem;
