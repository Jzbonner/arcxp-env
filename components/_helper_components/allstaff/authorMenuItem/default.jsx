import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import './default.scss';

const AuthorMenuItem = ({
  selectedLeftMenuItem, area, setSelectedLeftMenuItem, pageUri,
}) => {
  const appContext = useAppContext();
  const { contextPath } = appContext;

  return (
    <li key={area.name} className={`c-author-menu-item ${area.id === selectedLeftMenuItem.id ? 'active' : ''}`}>
      <a href={`${contextPath}/${pageUri}?area=${area.tag}`} onClick={() => setSelectedLeftMenuItem(area)}>
        {area.name}
      </a>
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
