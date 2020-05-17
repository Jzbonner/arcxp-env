import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';

const AuthorMenuItem = ({
  selectedLeftMenuItem, area, setSelectedLeftMenuItem, pageUri,
}) => {
  const appContext = useAppContext();
  const { contextPath } = appContext;

  if (area.id === selectedLeftMenuItem.id) {
    return (
      <li
        key={area.name}
        className={`author-menu-item ${area.id === selectedLeftMenuItem.id ? 'active' : ''}`}
        onClick={() => setSelectedLeftMenuItem(area)}
      >
        <a href={`${contextPath}/${pageUri}?area=${area.tag}`}>{area.name}</a>
      </li>
    );
  }

  return (
    <li
      key={area.name}
      className={`author-menu-item ${area.id === selectedLeftMenuItem.id ? 'active' : ''}`}
      onClick={() => setSelectedLeftMenuItem(area)}
    >
      <a href={`${contextPath}/${pageUri}?area=${area.tag}`}>{area.name}</a>
    </li>
  );
};

AuthorMenuItem.propTypes = {
  setSelectedLeftMenuItem: PropTypes.func,
  selectedLeftMenuItem: PropTypes.object,
  area: PropTypes.object,
  pageUri: PropTypes.string,
};

export default AuthorMenuItem;
