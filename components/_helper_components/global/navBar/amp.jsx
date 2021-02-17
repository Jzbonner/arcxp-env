import React from 'react';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import { useAppContext, useFusionContext } from 'fusion:context';
import topNavFilter from '../../../../content/filters/top-nav';
import getDomain from '../../../layouts/_helper_functions/getDomain';

const AmpNavBar = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    logo, logoShort, userLoggedIn, userLoggedOut, userIconWhite, closeButton, siteName, cdnSite, cdnOrg,
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

  const shortLogoCheck = arcSite === 'ajc' ? logo : logoShort;

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
          <amp-img width='44px' height='44px' src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${closeButton}`)}`}></amp-img>
        </a>
        <ul>
          <li className="amp-nav-link amp-auth">
            <a on="tap:amp-access.login-logoutEmbedded" data-mg2-action="logout" data-mce-href="#" amp-access='UserState!="LoggedOut"' amp-access-hide>
              <amp-img src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${userIconWhite}`)}`} width="35px" height="35px" layout="fixed"></amp-img>
              <span>Log Out</span>
            </a>
            <a on="tap:amp-access.login-loginEmbedded" data-mg2-action="login" data-mce-href="#" data-mce-selected="1" amp-access='UserState="LoggedOut"' amp-access-hide>
              <amp-img src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${userIconWhite}`)}`} width="35px" height="35px" layout="fixed"></amp-img>
              <span>Log In</span>
            </a>
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
            src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${shortLogoCheck}`)}`} layout='responsive'></amp-img>
            </a>
          </div>
          <div id="logo-main" className='amp-logo amp-logo-main'>
            <a href={rootDirectory}>
              <amp-img height='1' width='1' class={siteName.toLowerCase()}
              src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logo}`)}`} layout='responsive'></amp-img>
            </a>
          </div>
          <div className="amp-login-nav">
            {/* // amp-access-hide='elide' prevents both userState icons from displaying at the same time */}
            <a on="tap:amp-access.login-logoutEmbedded" data-mg2-action="logout" data-mce-href="#" amp-access='UserState!="LoggedOut"' amp-access-hide='elide'>
              <amp-img src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${userLoggedIn}`)}`} width="28px" height="28px" layout="fixed"></amp-img>
            </a>
            <a on="tap:amp-access.login-loginEmbedded" data-mg2-action="login" data-mce-href="#" data-mce-selected="1" amp-access='UserState="LoggedOut"' amp-access-hide='elide'>
              <amp-img src={`${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${userLoggedOut}`)}`} width="28px" height="28px" layout="fixed"></amp-img>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default AmpNavBar;
