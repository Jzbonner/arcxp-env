import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext, useFusionContext } from 'fusion:context';
import fetchEnv from '../../global/utils/environment';
import './default.scss';

const AuthorMenuItem = ({
  selectedLeftMenuItem,
  area,
  setCategory,
  pageUri,
  setBorderBottomOnLast = false,
}) => {
  const appContext = useAppContext();
  const { contextPath } = appContext;
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  const isProd = fetchEnv() === 'prod';

  return (<li
    key={area.name}
    className={`c-author-menu-item ${
      area.id === selectedLeftMenuItem.id ? 'active' : ''} ${setBorderBottomOnLast && area.id !== selectedLeftMenuItem.id ? 'set-border-bottom' : ''}`}>
      <a
        href={`${contextPath}/${pageUri}/${area.tag}${!isProd && `?_website=${arcSite}`}`}
        onClick={e => setCategory(e, area)}>
        {area.name}
      </a>
    </li>);
};

AuthorMenuItem.propTypes = {
  setCategory: PropTypes.func,
  selectedLeftMenuItem: PropTypes.object,
  area: PropTypes.object,
  pageUri: PropTypes.string,
  setBorderBottomOnLast: PropTypes.bool,
};

export default AuthorMenuItem;
