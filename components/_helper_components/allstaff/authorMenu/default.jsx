import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import AREAS_OF_EXPERTISE from '../AREAS_OF_EXPERTISE';
import AuthorMenuItem from '../authorMenuItem/default';
import getWindowSize from '../../global/utils/check_window_size/default';
import close from '../../../../resources/icons/staff/close.svg';
import './default.scss';

const AuthorMenu = ({
  selectedLeftMenuItem, setSelectedLeftMenuItem, leftMenuMenuVisibility, setLeftMenuVisibility, pageUri,
}) => {
  const { sites, maxTabletViewWidth } = getProperties();
  const windowWidth = getWindowSize();

  useLayoutEffect(() => {
    if (windowWidth.width < maxTabletViewWidth) {
      const authorMenu = document.querySelector('.author-menu');
      const items = document.querySelectorAll('.c-author-menu-item');

      let height = 0;
      let offset = 0;
      if (Array.isArray(items)) {
        const heightOfOneLine = items[0].offsetHeight;

        for (let i = 1; i < items.length; i += 1) {
          height += items[i].offsetHeight;
          if (items[i].classList.contains('active')) {
            if (items[i].offsetHeight > heightOfOneLine) {
              offset = 15;
            } else {
              offset = 0;
            }
            break;
          }
        }
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
              area={AREAS_OF_EXPERTISE()[sites[0]] && AREAS_OF_EXPERTISE()[sites[0]].all}
              selectedLeftMenuItem={selectedLeftMenuItem}
              setSelectedLeftMenuItem={setSelectedLeftMenuItem}
              setLeftMenuVisibility={setLeftMenuVisibility}
              pageUri={pageUri}
            />
            <AuthorMenuItem
              area={AREAS_OF_EXPERTISE()[sites[0]] && AREAS_OF_EXPERTISE()[sites[0]].newsroom}
              selectedLeftMenuItem={selectedLeftMenuItem}
              setSelectedLeftMenuItem={setSelectedLeftMenuItem}
              setLeftMenuVisibility={setLeftMenuVisibility}
              pageUri={pageUri}
            />
            {AREAS_OF_EXPERTISE()[sites[0]]
              && AREAS_OF_EXPERTISE()[sites[0]].areas.sort((a, b) => a.tag.localeCompare(b.tag))
                .map(area => (
                  <AuthorMenuItem
                    key={`key-${area.tag}`}
                    area={area}
                    selectedLeftMenuItem={selectedLeftMenuItem}
                    setSelectedLeftMenuItem={setSelectedLeftMenuItem}
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
  setSelectedLeftMenuItem: PropTypes.func,
  selectedLeftMenuItem: PropTypes.object,
  setLeftMenuVisibility: PropTypes.func,
  leftMenuMenuVisibility: PropTypes.bool,
  pageUri: PropTypes.string,
};

export default AuthorMenu;
