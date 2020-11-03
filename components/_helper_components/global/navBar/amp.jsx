import React from 'react';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import topNavFilter from '../../../../content/filters/top-nav';
import getDomain from '../../../layouts/_helper_functions/getDomain';
import closeButton from '../../../../resources/images/amp-close.png';

const AmpNavBar = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    logo, logoShort, siteName, cdnSite, cdnOrg,
  } = getProperties(arcSite);
  const appContext = useAppContext();
  const { deployment, contextPath, layout } = appContext;
  const sections = useContent({
    source: 'site-api',
    query: {
      hierarchy: 'TopNavRedesign',
    },
    filter: topNavFilter,
  });

  const {
    _id: rootDirectory,
    children,
  } = sections || {};

  const sectionLi = children && children.map((section) => {
    const {
      _id: id,
      site,
      navigation,
    } = section || {};
    const {
      site_url: siteURL,
    } = site || {};
    const {
      nav_title: sectionName,
    } = navigation;

    return (
      <li key={id}><div className='amp-nav-section'><a className='amp-nav-link' href={siteURL || id}>{sectionName}</a></div></li>
    );
  });

  const outputAnimationScript = (shrinkOrGrow) => {
    const translateY1 = shrinkOrGrow === 'headerShrinkAnim' ? '-35px' : '0';
    const translateY2 = shrinkOrGrow === 'headerShrinkAnim' ? '20px' : '0';
    const logoMainOpacity = shrinkOrGrow === 'headerShrinkAnim' ? '0' : '1';
    const logoPinnedOpacity = shrinkOrGrow === 'headerShrinkAnim' ? '1' : '0';
    return <script type="application/json" dangerouslySetInnerHTML={{
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
                      "transform": "translateY(${translateY1})"
                    }
                  ]
                },
                {
                  "selector": "#stickySelector .amp-nav",
                  "keyframes": [
                    {
                      "transform": "translateY(${translateY2})"
                    }
                  ]
                },
                {
                  "selector": "#logo-main, .sub-header .live-play",
                  "keyframes": [
                    {
                      "opacity": ${logoMainOpacity}
                    }
                  ]
                },
                {
                  "selector": "#logo-pinned, #stickySelector .amp-nav .live-play",
                  "keyframes": [
                    {
                      "opacity": ${logoPinnedOpacity}
                    }
                  ]
                }
              ]
            }`,
    }}></script>;
  };

  return (
    <>
      <amp-sidebar id="sidebar" layout="nodisplay" side="left" class="amp-sidebar">
        <a className="close" on="tap:sidebar.close">
          <amp-img width='44px' height='44px' src={closeButton}></amp-img>
        </a>
        <ul>
          <li amp-access="Error != true AND UserState = 'LoggedOut'" amp-access-hide className="amp-nav-section">
            <a className="amp-nav-link" on="tap:amp-access.login-loginEmbedded">Log in</a>
          </li>
          <li amp-access="Error = true" amp-access-hide className="amp-nav-section">
            <a className="amp-nav-link" on="tap:amp-access.login-loginEmbedded">Error</a>
          </li>
          <li amp-access="AccessLevel = 'Fallback_EmptyReaderId'" amp-access-hide className="amp-nav-section">
            <a className="amp-nav-link" on="tap:amp-access.login-loginEmbedded">Empty reader id access level</a>
          </li>
          <li amp-access="Error != true AND UserState != 'Subscribed'" amp-access-hide className="amp-nav-section">
            <a className="amp-nav-link" on="tap:amp-access.login-SubscribeInMarket">Subscribe</a>
          </li>
          <li amp-access="Error != true AND UserState != 'Subscribed' AND UserState != 'LoggedOut'" amp-access-hide className="amp-nav-section">
            <a className="amp-nav-link" on="tap:amp-access.login-activateEmbedded">Activate</a>
          </li>
          <li amp-access="Error != true AND UserState = 'Subscribed'" amp-access-hide className="amp-nav-section">
            <a className="amp-nav-link">Manage Account</a>
          </li>
          {sectionLi}
        </ul>
      </amp-sidebar>
      <div id="page-header-anim-marker">
        <amp-position-observer on="enter:headerGrowAnim.start; exit:headerShrinkAnim.start"
        intersection-ratios=".5"
        layout="nodisplay">
        </amp-position-observer>
      </div>
      <header className="c-amp-header" id="stickySelector">
        <amp-animation id="headerShrinkAnim" layout="nodisplay">
          {outputAnimationScript('headerShrinkAnim')}
        </amp-animation>
        <amp-animation id="headerGrowAnim" layout="nodisplay">
          {outputAnimationScript('headerGrowAnim')}
        </amp-animation>
        <div className='amp-nav'>
          <div className='amp-hamburger' role='button' tabIndex='0' on="tap:sidebar.toggle">
            <div className='amp-hamburger-button'></div>
          </div>
          <div id="logo-pinned" className='amp-logo amp-logo-pinned'>
            <a href={rootDirectory}>
            <amp-img height='1' width='1' class={siteName.toLowerCase()}
            src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logoShort}`)}`} layout='responsive'></amp-img>
            </a>
          </div>
          <div id="logo-main" className='amp-logo amp-logo-main'>
            <a href={rootDirectory}>
              <amp-img height='1' width='1' class={siteName.toLowerCase()}
              src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logo}`)}`} layout='responsive'></amp-img>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default AmpNavBar;
