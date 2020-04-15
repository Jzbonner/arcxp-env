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
    _id: rootDirectory,
  } = sections || {};

  const {
    site_logo_image: siteLogoImage,
    site_logo_image_small: siteLogoImageSmall,
  } = logos || {};
  return (
    <>
      <div id="page-header-anim-marker">
        <amp-position-observer on="enter:headerGrowAnim.start; exit:headerShrinkAnim.start"
        intersection-ratios=".5"
        layout="nodisplay">
        </amp-position-observer>
      </div>
      <header className="c-amp-header" id="stickySelector">
        <amp-animation id="headerShrinkAnim" layout="nodisplay">
          <script type="application/json"
          dangerouslySetInnerHTML={{
            __html: `
          {
            "duration": "300ms",
            "fill": "both",
            "iterations": "1",
            "direction": "alternate",
            "animations": [
              {
                "selector": "#stickySelector",
                "keyframes": [
                  {
                    "transform": "translateY(-35px)"
                  }
                ]
              },
              {
                "selector": "#stickySelector .amp-nav",
                "keyframes": [
                  {
                    "transform": "translateY(20px)"
                  }
                ]
              },
              {
                "selector": "#logo-main, .sub-header .live-play",
                "keyframes": [
                  {
                    "opacity": 0
                  }
                ]
              },
              {
                "selector": "#logo-pinned, #stickySelector .amp-nav .live-play",
                "keyframes": [
                  {
                    "opacity": 1
                  }
                ]
              }
            ]
          }`,
          }}>
          </script>
        </amp-animation>
        <amp-animation id="headerGrowAnim" layout="nodisplay">
          <script type="application/json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "duration": "300ms",
                "fill": "both",
                "iterations": "1",
                "direction": "alternate",
                "animations": [
                  {
                    "selector": "#stickySelector",
                    "keyframes": [
                      {
                        "transform": "translateY(0)"
                      }
                    ]
                  },
                  {
                    "selector": "#stickySelector .amp-nav",
                    "keyframes": [
                      {
                        "transform": "translateY(0)"
                      }
                    ]
                  },
                  {
                    "selector": "#logo-main, .sub-header .live-play",
                    "keyframes": [
                      {
                        "opacity": 1
                      }
                    ]
                  },
                  {
                    "selector": "#logo-pinned, #stickySelector .amp-nav .live-play",
                    "keyframes": [
                      {
                        "opacity": 0
                      }
                    ]
                  }
                ]
              }`,
          }}>
          </script>
        </amp-animation>
        <div className='amp-nav'>
          <div className='amp-hamburger'>
            <div className='amp-hamburger-button'></div>
          </div>
          <div id="logo-pinned" className="amp-logo amp-logo-pinned">
            <a href={rootDirectory}>
            <amp-img height='37px' width='72px' src={siteLogoImageSmall}></amp-img>
            </a>
          </div>
          <div id="logo-main" className="amp-logo">
            <a href={rootDirectory}>
              <amp-img height='59px' width='109px' src={siteLogoImage}></amp-img>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default AmpNavBar;
