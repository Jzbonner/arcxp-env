import React from 'react';
import PropTypes from 'prop-types';
import AREAS_OF_EXPERTISE from '../AREAS_OF_EXPERTISE';
import './default.scss';

const AuthorMenu = ({
  selectedLeftMenuItem, setSelectedLeftMenuItem, leftMenuMenuVisibility, setLeftMenuVisibility,
}) => (
  <>
    <aside className={`c-author-menu ${leftMenuMenuVisibility ? 'is-visible' : ''}`}>
      <div className="mobile-fader top-fader"></div>
      <ul className="author-menu">
        <li className="spacer"></li>
        {AREAS_OF_EXPERTISE().atlanta.map((area) => {
          if (area.id === selectedLeftMenuItem.id) {
            return (
              <li
                key={area.name}
                className={`author-menu-item ${area.id === selectedLeftMenuItem.id ? 'active' : ''}`}
                onClick={() => setSelectedLeftMenuItem(area)}
              >
                {area.name}
                <button className={'btn-left-menu-menu'} onClick={() => setLeftMenuVisibility()}></button>
              </li>
            );
          }
          return (
            <li
              key={area.name}
              className={`author-menu-item ${area.id === selectedLeftMenuItem.id ? 'active' : ''}`}
              onClick={() => setSelectedLeftMenuItem(area)}
            >
              {area.name}
            </li>
          );
        })}
        <li className="spacer"></li>
      </ul>
      <div className="mobile-fader bottom-fader"></div>
    </aside>
  </>
);

AuthorMenu.propTypes = {
  setSelectedLeftMenuItem: PropTypes.func,
  selectedLeftMenuItem: PropTypes.object,
  setLeftMenuVisibility: PropTypes.func,
  leftMenuMenuVisibility: PropTypes.bool,
};

export default AuthorMenu;
