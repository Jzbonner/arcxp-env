import React from 'react';
import { useContent } from 'fusion:content';
import topNavFilter from '../../../../content/filters/top-nav';

const AmpNavBar = () => {
  const sections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopNav',
    },
    filter: topNavFilter,
  });

  const {
    site: logos,
    social,
    children,
    _id: rootDirectory,
  } = sections || {};

  const {
    site_logo_image: siteLogoImage,
    site_logo_image_small_inverse: siteLogoImageSmallInverse,
  } = logos || {};
  console.log(social, children, siteLogoImageSmallInverse);

  return (
<div className="c-amp-nav">
<amp-animation id="stickyAnimation" layout="nodisplay">
  <script type="application/json"
  dangerouslySetInnerHTML={{
    __html: `
    {
      "duration" : "1",
      "fill": "both",
      "direction": "reverse",
      "animations": [{
        "selector": ".article-headline-component",
        "keyframes": [{
          "transform": "height(70px)"
        }]
      }]
    }`,
  }}>
  </script>
</amp-animation>

  <div className='amp-content'>
    <div className='amp-hamburger'>
      <div className='amp-hamburger-button'></div>
    </div>
    <a href={rootDirectory}>
        <amp-img height='59px' width='109px' src={siteLogoImage}></amp-img>
    </a>
  </div>

</div>
  );
};

export default AmpNavBar;
