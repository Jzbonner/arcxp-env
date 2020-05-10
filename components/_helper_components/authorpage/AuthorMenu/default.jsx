import React, { useState } from 'react';
import AREAS_OF_EXPERTISE from './AREAS_OF_EXPERTISE';
import './default.scss';

const AuthorMenu = () => {
  const [activeMenu, setActiveMenu] = useState('');

  return (
    <>
      <ul className="author-menu">
        {AREAS_OF_EXPERTISE().atlanta.map(areas => (
          <li
            key={areas.name}
            className={`author-menu-item ${areas.id === activeMenu ? 'active' : ''}`}
            onClick={() => setActiveMenu(areas.id)}
          >
            {areas.name}
          </li>
        ))}
      </ul>
      <div className="staff">
        <button>Toggle Mobile Menu</button>
        Staff
      </div>
    </>
  );
};

export default AuthorMenu;
