import React from 'react';
import { useContent } from 'fusion:content';
import Section from './section/default';

const NavBar = () => {
  const sections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopNav',
    },
  });
  console.log(sections);

  return (
    <div>
      <header>
        <nav>
          <ul>
            <Section/>
            <li><a>Politics</a></li>
            <li><a>County By County</a></li>
            <li><a>Things To Do</a></li>
            <li><a></a></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </header>

    </div>
  );
};

export default NavBar;
