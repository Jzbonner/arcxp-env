import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import AREAS_OF_EXPERTISE from '../AREAS_OF_EXPERTISE';
import AuthorMenuItem from '../authorMenuItem/default';
import getWindowSize from '../../global/utils/check_window_size/default';
import close from '../../../../resources/icons/staff/close.svg';
import './default.scss';

const AuthorMenu = ({
  selectedLeftMenuItem, setCategory, leftMenuMenuVisibility, setLeftMenuVisibility, pageUri,
}) => {
  const { sites, maxTabletViewWidth } = getProperties();
  const windowWidth = getWindowSize();
  const menuData = AREAS_OF_EXPERTISE()[sites[0]];

  useEffect(() => {
    if (windowWidth.width < maxTabletViewWidth) {
      const authorMenu = document.querySelector('.author-menu');
      const items = document.querySelectorAll('.c-author-menu-item') || [];
      const heightOfOneLine = items[0] && items[0].offsetHeight;

      let height = 0;
      let offset = 0;

      for (let i = 0; i < items.length; i += 1) {
        if (items[i].classList.contains('active')) {
          if (items[i].offsetHeight > heightOfOneLine) {
            offset = -15;
          } else {
            offset = -5;
          }
          break;
        }
        height += items[i].offsetHeight;
      }

      if (authorMenu) {
        authorMenu.scrollTop = height - offset;
      }
    }
  });

  return (
    <>
      <aside className={`c-author-menu ${leftMenuMenuVisibility ? 'is-visible' : ''}`}>
        <div className="menu-wrapper">
          <div className="mobile-fader top-fader"></div>
          <ul className="author-menu">
            <li className="spacer top-space"></li>
            <AuthorMenuItem
              area={menuData && menuData.all}
              selectedLeftMenuItem={selectedLeftMenuItem}
              setCategory={setCategory}
              setLeftMenuVisibility={setLeftMenuVisibility}
              pageUri={pageUri}
            />
            <AuthorMenuItem
              area={menuData && menuData.newsroom}
              selectedLeftMenuItem={selectedLeftMenuItem}
              setCategory={setCategory}
              setLeftMenuVisibility={setLeftMenuVisibility}
              pageUri={pageUri}
            />
            {menuData
              && menuData.areas
                .sort((a, b) => a.tag.localeCompare(b.tag))
                .map(area => (
                  <AuthorMenuItem
                    key={`key-${area.tag}`}
                    area={area}
                    selectedLeftMenuItem={selectedLeftMenuItem}
                    setCategory={setCategory}
                    setLeftMenuVisibility={setLeftMenuVisibility}
                    pageUri={pageUri}
                  />
                ))}
            <li className="spacer bottom-space"></li>
          </ul>
          <div className="mobile-fader bottom-fader"></div>
        </div>
        <button className={'close-mobile-menu-btn'} onClick={() => setLeftMenuVisibility()}>
          <img src={close} alt={'close-button'} />
        </button>
      </aside>
    </>
  );
};

AuthorMenu.propTypes = {
  setCategory: PropTypes.func,
  selectedLeftMenuItem: PropTypes.object,
  setLeftMenuVisibility: PropTypes.func,
  leftMenuMenuVisibility: PropTypes.bool,
  pageUri: PropTypes.string,
};

export default AuthorMenu;
