/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext } from 'fusion:context';
import get from 'lodash/get';
import fetchEnv from '../utils/environment';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import deferThis from '../utils/deferLoading';
import gamAdTagBuilder from './_helper_functions/gamAdTagBuilder';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
// import handleSiteName from '../../../layouts/_helper_functions/handleSiteName.js';
import './default.scss';
import '../../../../src/styles/base/_utility.scss';

const Video = ({
  src, isLeadVideo, isInlineVideo, maxTabletViewWidth, featuredVideoPlayerRules, inlineVideoPlayerRules, pageTaxonomy = [], lazyLoad = false,
}) => {
  const appContext = useAppContext();
  const { globalContent, requestUri, layout } = appContext;
  const fusionContext = useFusionContext();
  const {
    credits, _id: videoID, videoPageId, taxonomy: videoTax = [], canonical_url: videoPageUrl,
  } = src || {};
  let pageTax = pageTaxonomy;
  if (layout === 'article-basic' && !pageTaxonomy.length) {
    const { taxonomy: gcTax } = globalContent;
    pageTax = gcTax;
  }

  const { basic: videoCaption } = src.description ? src.description : {};
  const { startPlaying, muteON, autoplayNext } = featuredVideoPlayerRules || inlineVideoPlayerRules;
  const screenSize = checkWindowSize();
  const { outputType, arcSite, layout: pageLayout } = fusionContext;
  let vidId = videoID || videoPageId;
  const currentEnv = fetchEnv();
  const { cdnOrg, cdnSite } = getProperties(arcSite);
  const thumbnailImage = renderImage();
  const orgOfRecord = cdnOrg || (arcSite === 'ajc' ? 'ajc' : 'coxohio');
  const siteOfRecord = cdnSite || arcSite;
  const isAmpOutput = outputType === 'amp';
  const isAmpWebPlayer = outputType === 'ampVideoIframe';
  // initial autoplay state: false if it's a lead video and we're lazy loading the video (i.e. paywall)
  let autoplayState = isLeadVideo && lazyLoad ? false : startPlaying;
  // update autoplay if it's ampVideoIframe (since we need some way to pass the state to the component through the iframe)
  if (isAmpWebPlayer) {
    if (requestUri.indexOf('autoplayState') > -1) {
      const autoplaySubstr = requestUri.substr(requestUri.indexOf('autoplayState'));
      const paramsArr = autoplaySubstr.split('&');
      const autoPlayParam = paramsArr[0].split('=')[1];
      autoplayState = autoPlayParam;
    }
  }

  let mainCredit;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
  }
  const adTag = gamAdTagBuilder(pageTax, videoTax, vidId, currentEnv, videoPageUrl || requestUri);

  useEffect(() => {
    window.powaRendered = window.powaRendered || [];
    window.powaVideos = window.powaVideos || [];
    // we can't rely on the `isLeadVideo` value once the onPowaRendered event fires, so we track the videos & lead-state separately
    window.powaVideos.push(vidId, isLeadVideo);
    window.PoWaSettings = window.PoWaSettings || {};
    if (adTag) {
      window.PoWaSettings.advertising = window.PoWaSettings.advertising || {};
      window.PoWaSettings.advertising.adBar = { skipControl: false };
      window.PoWaSettings.advertising.adTag = adTag;
    }
    window.PoWaSettings.container = {
      ...window.PoWaSettings.container,
      shadowDOM: false,
    };
    let videoTotalTime;
    let videoTitle;
    let videoPlayType;
    let videoPlayerVersion;
    let videoContentType;
    let videoTopics;

    const buildGtmObject = (evt) => {
      const { muted: mutedState, time, type } = evt || {};
      /*
        We override (or omit) eventType or ampEvent in the following cases to tailor output to either metrics, or amp, or both:
          - If both are present, then that video event is emitted to both outputs.
          - If `eventType` is set to null, it's an amp-specific event that should not be tracked in metrics.
          - And if `ampEvent` is excluded, it's a metrics-only event that should not be passed to the AMP integration.
        There wasn't much reason to create separate handlers for something shared, so `fireGtmEvent` pulls double duty.
      */
      let eventType;
      let ampEvent = null;
      switch (type) {
        case 'adStart':
          ampEvent = 'ad_start';
          eventType = 'videoAdStart';
          break;
        case 'adComplete':
          ampEvent = 'ad_end';
          eventType = 'videoAdComplete';
          break;
        case 'muted':
          ampEvent = mutedState ? 'muted' : 'unmuted';
          eventType = null;
          break;
        case 'pause':
          ampEvent = 'pause';
          eventType = null;
          break;
        case 'play':
          ampEvent = 'playing';
          eventType = null;
          break;
        case 'playback0':
          eventType = 'videoContentStart';
          break;
        case 'playback25':
          eventType = 'videoView25Checkpoint';
          break;
        case 'playback50':
          eventType = 'videoView50Checkpoint';
          break;
        case 'playback75':
          eventType = 'videoView75Checkpoint';
          break;
        case 'playback100':
          eventType = 'videoComplete';
          break;
        case 'powaRender':
          eventType = 'videoPlayerLoad';
          ampEvent = 'canplay';
          break;
        case 'start':
          eventType = 'videoStart';
          ampEvent = 'playing';
          break;
        case 'error':
          eventType = 'videoError';
          break;
        case 'adError':
          eventType = 'videoAdError';
          break;
        case 'adSkip':
          eventType = 'videoAdSkip';
          break;
        default:
          eventType = null;
      }
      const analyticsEventType = eventType;
      const videoPayload = {
        videoSource: 'arc',
        videoTitle,
        videoID: vidId,
        videoContentType: videoContentType === 'clip' ? 'vod' : videoContentType,
        videoPlayType,
        videoTotalTime,
        videoPlayerVersion,
        videoTopics,
        videoAccountID: '',
        videoSeekTime: time,
        videoPageName: evt.videoData.canonical_url,
      };
      if (isAmpWebPlayer && ampEvent) {
        return {
          ampPlayerEvent: ampEvent,
          ampAnalyticsEvent: analyticsEventType,
          videoPayload,
        };
      }
      return {
        event: analyticsEventType,
        videoPayload,
      };
    };

    const fireGtmEvent = (evt) => {
      // fire GTM events for various player events
      const dataLayer = window.dataLayer || [];
      dataLayer.push(buildGtmObject(evt));
    };

    const powaRendered = (e) => {
      const id = get(e, 'detail.id');
      const powa = get(e, 'detail.powa');
      // we remove the `powa-` prefix from the player id
      let powaVideoId = id.replace('powa-', '');
      // and then we remove the `-[player index]` suffix from the player id, to give us the original video id
      powaVideoId = powaVideoId.substr(0, powaVideoId.lastIndexOf('-'));
      // finally we find the video's index in the powaVidoes object and fetch the next item, determining whether it is a lead video
      const isLead = window.powaVideos[window.powaVideos.indexOf(powaVideoId) + 1] || false;

      // go ahead and define vars for use in subsequent events/metrics
      const { detail: videoDetails } = e || {};
      const { videoData: ogVideoData, autoplay: ogAutoplay } = videoDetails || {};
      const {
        duration: ogDuration = 0, headlines: ogHeadlines, taxonomy: ogTaxonomy, _id: ogVidId, version: ogVersion, video_type: ogVidType,
      } = ogVideoData || {};
      const { basic: ogHeadline } = ogHeadlines || {};
      const { tags: ogTags = [] } = ogTaxonomy || {};

      // protect against the player not existing (just in case)
      if (typeof powa !== 'undefined') {
        /*
          if it's a lead video and the story is paywalled, pass the player to `deferThis` to be lazyLoaded
          & queued for (eventual) triggering in components/_helper_components/global/connext/default.jsx
          (`ConnextAuthTrigger` function, called in `article-basic` layout)
        */

        if (lazyLoad) {
          deferThis({ video: [powa, isLead] });
          powa.hideControls();
        }

        // bind to ampIntegration events, to control the PoWa player from AMP
        if (isAmpWebPlayer) {
          const onAmpIntegrationReady = (ampIntegration) => {
            // `ampIntegration` is an object containing the tools required to integrate.
            // This callback specifies how the AMP document and the iframed video document
            // talk to each other.

            // amp -> player triggers
            ampIntegration.method('play', () => powa.play());
            ampIntegration.method('pause', () => powa.pause());
            ampIntegration.method('mute', () => powa.mute(true));
            ampIntegration.method('unmute', () => powa.mute(false));
            ampIntegration.method('showcontrols', () => powa.showControls());
            ampIntegration.method('hidecontrols', () => powa.hideControls());
            ampIntegration.method('fullscreenenter', () => powa.fullscreen(true));
            ampIntegration.method('fullscreenexit', () => powa.fullscreen(false));

            const postToAmp = (evt) => {
              const { ampPlayerEvent, ampAnalyticsEvent, videoPayload } = buildGtmObject(evt) || {};
              if (ampPlayerEvent) {
                ampIntegration.postEvent(ampPlayerEvent);
              }
              if (ampAnalyticsEvent) {
                ampIntegration.postAnalyticsEvent(ampAnalyticsEvent, videoPayload);
              }
            };

            // player -> amp triggers
            powa.on('adComplete', evt => postToAmp(evt));
            powa.on('adError', evt => postToAmp(evt));
            powa.on('adStart', evt => postToAmp(evt));
            powa.on('muted', evt => postToAmp(evt));
            powa.on('pause', evt => postToAmp(evt));
            powa.on('play', evt => postToAmp(evt));
            powa.on('start', evt => postToAmp(evt));
            // trigger initial postEvent since we're in the `powaRender` event
            postToAmp(videoDetails);
          };

          (window.AmpVideoIframe = window.AmpVideoIframe || []).push(onAmpIntegrationReady);
        }

        // (re)set video-specific values, for use in gtm
        videoTotalTime = typeof ogDuration === 'number' && ogDuration > 0 ? ogDuration / 1000 : ogDuration;
        vidId = ogVidId;
        videoTitle = ogHeadline;
        videoPlayType = ogAutoplay ? 'auto-play' : 'manual-play';
        videoTopics = ogTags.map(tag => tag.text);
        videoPlayerVersion = ogVersion;
        videoContentType = ogVidType;

        fireGtmEvent(videoDetails);

        powa.on('start', (event) => {
          const { id: playerId, videoData, autoplay } = event || {};

          // grab the title and poster for each video event
          const { basic: vidTitle } = videoData && videoData.headlines ? videoData.headlines : {};
          const { url: vidPoster } = videoData && videoData.promo_image ? videoData.promo_image : {};
          // get parent div
          const getVideoParent = document.querySelectorAll('.video-component');

          // append attributes to video func
          const appendDataToVideo = (tag) => {
            tag.setAttribute('title', vidTitle);
            tag.setAttribute('poster', vidPoster);
          };

          // send video tags to chartbeat once title and poster are appended
          const sendVideoToChartbeat = (videoTag) => {
            window._cbv = window._cbv || [];
            window._cbv.push(videoTag);
          };
          // find video tag within parent divs and append attributes.
          Array.from(getVideoParent).map((childNode) => {
            const children = childNode && childNode.children ? childNode.children : {};
            Array.from(children).map((el) => {
              const videoTag = el.getElementsByTagName('video')[0];
              // create event listener for inline videos where the video tag doesn't exist yet.
              // send inline video tag to Chartbeat
              if (!videoTag) {
                el.addEventListener('click', () => {
                  const inlineVideoTag = el.children[2];
                  appendDataToVideo(inlineVideoTag);
                  sendVideoToChartbeat(inlineVideoTag);
                });
              } else {
                // append to lead video where the video tag always exists due to autoPlay=true
                // send lead video tag to Chartbeat
                appendDataToVideo(videoTag);
                sendVideoToChartbeat(videoTag);
              }
              return null;
            });
            return null;
          });

          const {
            canonical_url: vidCanonical, credits: vidCredits, description, duration = 0, headlines, taxonomy, _id: vId, version, video_type: vidType,
          } = videoData || {};
          const { basic: headline } = headlines || {};
          const { basic: vidCaption } = description || {};
          const { tags = [] } = taxonomy || {};
          let vidCredit = '';
          if (vidCredits) {
            vidCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
          }
          // video start: update various elements if/when necessary (i.e. subsequent video (playlist) start event)
          if (vidId !== vId) {
            // (re)set video-specific values, for use in gtm
            videoTotalTime = typeof duration === 'number' && duration > 0 ? duration / 1000 : duration;
            vidId = vId;
            videoTitle = headline;
            videoPlayType = autoplay ? 'auto-play' : 'manual-play';
            videoTopics = tags.map(tag => tag.text);
            videoPlayerVersion = version;
            videoContentType = vidType;
            // make everything relative to the player's container, in case there are multiple players on the page
            const playerEl = document.querySelector(`#${playerId}`);
            const videoComponent = playerEl.parentNode.parentNode;
            const captionContainer = videoComponent.querySelector('.c-caption') || null;
            const captionText = captionContainer ? captionContainer.querySelector('.photo-caption-text') : null;
            const creditContainer = videoComponent.querySelector('.video-credit-text');
            const creditContainerMobile = videoComponent.querySelector('.photo-credit-text');
            if (pageLayout.indexOf('video') > -1 && vidCanonical && headline) {
              // only update url & headline if it's a video page
              window.history.pushState({ vId }, headline, vidCanonical);
              document.querySelector('.article-headline-component .headline-body .headline-text').innerHTML = headline;
            }
            if (vidCaption && captionContainer) {
              captionText.innerHTML = vidCaption;
              captionContainer.style.display = 'block';
            } else if (captionContainer) {
              captionContainer.style.display = 'none';
            }
            if (creditContainer) {
              creditContainer.innerHTML = vidCredit;
            }
            if (creditContainerMobile) {
              creditContainerMobile.innerHTML = vidCredit;
            }
          }
          fireGtmEvent(event);
        });
        powa.on('adComplete', evt => fireGtmEvent(evt));
        powa.on('adError', evt => fireGtmEvent(evt));
        powa.on('adSkip', evt => fireGtmEvent(evt));
        powa.on('adStart', evt => fireGtmEvent(evt));
        powa.on('error', evt => fireGtmEvent(evt));
        powa.on('muted', evt => fireGtmEvent(evt));
        powa.on('pause', evt => fireGtmEvent(evt));
        powa.on('play', evt => fireGtmEvent(evt));
        powa.on('playback0', evt => fireGtmEvent(evt));
        powa.on('playback25', evt => fireGtmEvent(evt));
        powa.on('playback50', evt => fireGtmEvent(evt));
        powa.on('playback75', evt => fireGtmEvent(evt));
        powa.on('playback100', evt => fireGtmEvent(evt));
      }

      // kick off playlist discovery
      if (typeof Discovery !== 'undefined') {
        window.Discovery({ id, powa });
      }
    };
    const powaRenderListener = (e) => {
      const id = get(e, 'detail.id');

      if (window.powaRendered.includes(id)) {
        // the `powaRendered` callback for this video has already been run, so abort
        return null;
      }
      window.powaRendered.push(id);
      return powaRendered(e);
    };
    window.addEventListener('powaRender', e => powaRenderListener(e));
    const loadVideoScript = (rejectCallBack = () => null) => new Promise((resolve, reject) => {
      if (!document.querySelector('#powaVideoScript')) {
        // the script hasn't already been loaded, so proceed
        const videoScript = document.createElement('script');
        videoScript.type = 'text/javascript';
        videoScript.id = 'powaVideoScript';
        videoScript.src = `https://d328y0m0mtvzqc.cloudfront.net/${currentEnv}/powaBoot.js?org=${siteOfRecord}`;
        videoScript.async = true;
        videoScript.addEventListener('load', () => {
          resolve();
        });
        videoScript.addEventListener('error', (e) => {
          reject(rejectCallBack(e));
        });
        document.body.appendChild(videoScript);
      } else {
        resolve();
      }
    });

    loadVideoScript();
    window.removeEventListener('powaRender', e => powaRenderListener(e));
  }, []);
  const videoMarginBottom = 'b-margin-bottom-d40-m20';
  const giveCredit = mainCredit ? `Credit: ${mainCredit}` : null;

  const smartChecker = () => {
    if ((isLeadVideo && !giveCredit && !videoCaption) || (isLeadVideo && giveCredit && !videoCaption && screenSize.width > maxTabletViewWidth) || (isInlineVideo && !videoCaption)) {
      return null;
    }

    if (isLeadVideo && giveCredit && !videoCaption && screenSize.width < maxTabletViewWidth) {
      return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
    }

    return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
  };

  const renderPowaPlayer = () => (
    <>
      <div className={isLeadVideo || !lazyLoad ? 'powa' : 'powa-lazyLoad'} data-org={orgOfRecord} data-env={currentEnv} data-aspect-ratio="0.5625" data-uuid={vidId} data-autoplay={autoplayState} data-muted={muteON} data-playthrough={autoplayNext || true} data-discovery={autoplayNext || true} data-autoinit={isInlineVideo ? 'false' : 'native-hls'} />
      {isLeadVideo && lazyLoad && <div className="video-blocker" />}
    </>
  );
  const { width: vidWidth } = src && src.streams && src.streams[0] ? src.streams[0] : {};
  const { height: vidHeight } = src && src.streams && src.streams[0] ? src.streams[0] : {};
  const encodedAdTag = encodeURIComponent(adTag).replace(/'/g, '%27').replace(/"/g, '%22');

  const ampIframe = () => (
    <>
    <amp-iframe
    layout="responsive"
    src={`https://${orgOfRecord}.video-player.arcpublishing.com/${currentEnv}/powaEmbed.html?org=${orgOfRecord}&uuid=${vidId}&powa-ad-tag=${encodedAdTag}&autoinit=native-hls&playthrough=true&discovery=true&powa-autoplay=${!isInlineVideo}&powa-muted=${!isInlineVideo}`}
    width={`${vidWidth}`}
    height={`${vidHeight}`}
    allow='autoplay'
    sandbox="allow-scripts allow-same-origin allow-popups"
    scrolling="no"
    allowfullscreen
    >
    <amp-img layout="fill" src={thumbnailImage} placeholder></amp-img>
    <div overflow tabIndex="0" role="button" aria-label="Watch more" style={{ display: 'none' }}>Watch more!</div>
</amp-iframe>
  </>
  );
  const renderAmpPlayer = () => (
    <>
      {lazyLoad && (
        <>
          <div amp-access='Error=true OR AccessLevel="Full Content Access"' amp-access-hide>
            {ampIframe()}
          </div>
          <div amp-access='Error!=true AND AccessLevel!="Full Content Access"'>
            <amp-img src={thumbnailImage} width="16" height="9" layout="responsive" />
          </div>
        </>
      )}
      {!lazyLoad && ampIframe()}
    </>
  );
  return (
    <div className={`c-video-component ${isInlineVideo ? videoMarginBottom : ''}`}>
      <div className="video-component">{isAmpOutput ? renderAmpPlayer() : renderPowaPlayer()}</div>
      {!isAmpOutput && (
        <>
          <p className={`video-credit-text ${isInlineVideo ? 'is-inline' : null}`}>{giveCredit}</p>
          {smartChecker()}
        </>
      )}
    </div>
  );
};
Video.propTypes = {
  src: PropTypes.object.isRequired,
  isLeadVideo: PropTypes.bool,
  isInlineVideo: PropTypes.bool,
  featuredVideoPlayerRules: PropTypes.object,
  inlineVideoPlayerRules: PropTypes.object,
  maxTabletViewWidth: PropTypes.number,
  pageTaxonomy: PropTypes.object,
  lazyLoad: PropTypes.bool,
};
export default Video;
