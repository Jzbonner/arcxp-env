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
  const {
    site_logo_image: siteLogoImage,
    children,
  } = sections;
  console.log(siteLogoImage);

  const sectionLi = children.map(section => (
    <>
     <Section key={section._id} config={section}/>
     </>
  ));


  return (
    <div>
      <header>
        <nav>
          <ul>
            {sectionLi}
          </ul>
        </nav>
      </header>

    </div>
  );
};

export default NavBar;
