import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import AREAS_OF_EXPERTISE from '../AREAS_OF_EXPERTISE';
import AuthorMenuItem from '../authorMenuItem/default';
import './default.scss';

const AuthorMenu = ({
  selectedLeftMenuItem, setSelectedLeftMenuItem, leftMenuMenuVisibility, setLeftMenuVisibility,
}) => {
  const { sites } = getProperties();

  return (
    <>
      <aside className={`c-author-menu ${leftMenuMenuVisibility ? 'is-visible' : ''}`}>
        <div className="mobile-fader top-fader"></div>
        <ul className="author-menu">
          <li className="spacer"></li>
          <AuthorMenuItem
            area={AREAS_OF_EXPERTISE()[sites[0]].all}
            selectedLeftMenuItem={selectedLeftMenuItem}
            setSelectedLeftMenuItem={setSelectedLeftMenuItem}
            setLeftMenuVisibility={setLeftMenuVisibility}
          />
          <AuthorMenuItem
            area={AREAS_OF_EXPERTISE()[sites[0]].newsroom}
            selectedLeftMenuItem={selectedLeftMenuItem}
            setSelectedLeftMenuItem={setSelectedLeftMenuItem}
            setLeftMenuVisibility={setLeftMenuVisibility}
          />
          {AREAS_OF_EXPERTISE()[sites[0]].areas.sort((a, b) => a.tag.localeCompare(b.tag))
            .map(area => (
              <AuthorMenuItem
                key={`key-${area.tag}`}
                area={area}
                selectedLeftMenuItem={selectedLeftMenuItem}
                setSelectedLeftMenuItem={setSelectedLeftMenuItem}
                setLeftMenuVisibility={setLeftMenuVisibility}
              />
            ))}
          <li className="spacer"></li>
        </ul>
        <div className="mobile-fader bottom-fader"></div>
      </aside>
    </>
  );
};

AuthorMenu.propTypes = {
  setSelectedLeftMenuItem: PropTypes.func,
  selectedLeftMenuItem: PropTypes.object,
  setLeftMenuVisibility: PropTypes.func,
  leftMenuMenuVisibility: PropTypes.bool,
};

export default AuthorMenu;
