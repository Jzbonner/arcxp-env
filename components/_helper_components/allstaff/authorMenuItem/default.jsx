import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import close from '../../../../resources/icons/staff/close.svg';

const AuthorMenuItem = ({
  selectedLeftMenuItem, area, setSelectedLeftMenuItem, setLeftMenuVisibility, pageUri,
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
        <button className={'btn-left-menu-menu'} onClick={() => setLeftMenuVisibility()}>
          <img src={close} alt={'close-button'} />
        </button>
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
  setLeftMenuVisibility: PropTypes.func,
  area: PropTypes.object,
  pageUri: PropTypes.string,
};

export default AuthorMenuItem;