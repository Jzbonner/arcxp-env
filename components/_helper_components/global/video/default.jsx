/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext } from 'fusion:context';
import get from 'lodash.get';
import fetchEnv from '../utils/environment';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import gamAdTagBuilder from './_helper_functions/gamAdTagBuilder';
import renderImage from '../../../layouts/_helper_functions/getFeaturedImage.js';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName.js';
import './default.scss';
import '../../../../src/styles/base/_utility.scss';

const Video = ({
  src, isLeadVideo, isInlineVideo, maxTabletViewWidth, featuredVideoPlayerRules, inlineVideoPlayerRules, pageTaxonomy = [],
}) => {
  const appContext = useAppContext();
  const { globalContent, requestUri, layout } = appContext;
  const fusionContext = useFusionContext();
  const {
    credits,
    _id: videoID,
    videoPageId,
    taxonomy: videoTax = [],
    canonical_url: videoPageUrl,
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
  let autoplayState = startPlaying;
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
    if (adTag) {
      window.PoWaSettings = window.PoWaSettings || {};
      window.PoWaSettings.advertising = window.PoWaSettings.advertising || {};
      window.PoWaSettings.advertising.adBar = { skipControl: false };
      window.PoWaSettings.advertising.adTag = adTag;
    }
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
      // default eventType value: naming convention remains, we simply prepend "video" and capitalize the first letter
      let eventType = `video${type.charAt(0).toUpperCase()}${type.slice(1)}`;
      let ampEvent = null;
      switch (type) {
        case 'adStart':
          ampEvent = 'ad_start';
          break;
        case 'adComplete':
          ampEvent = 'ad_end';
          break;
        case 'muted':
          eventType = null;
          ampEvent = mutedState ? 'muted' : 'unmuted';
          break;
        case 'pause':
          eventType = null;
          ampEvent = 'pause';
          break;
        case 'play':
          eventType = null;
          ampEvent = 'playing';
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
          ampEvent = 'playing';
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

      // go ahead and define vars for use in subsequent events/metrics
      const { detail: videoDetails } = e || {};
      const {
        videoData: ogVideoData,
        autoplay: ogAutoplay,
      } = videoDetails || {};
      const {
        duration: ogDuration = 0,
        headlines: ogHeadlines,
        taxonomy: ogTaxonomy,
        _id: ogVidId,
        version: ogVersion,
        video_type: ogVidType,
      } = ogVideoData || {};
      const { basic: ogHeadline } = ogHeadlines || {};
      const { tags: ogTags = [] } = ogTaxonomy || {};

      // (re)set video-specific values, for use in gtm
      videoTotalTime = typeof ogDuration === 'number' && ogDuration > 0 ? ogDuration / 1000 : ogDuration;
      vidId = ogVidId;
      videoTitle = ogHeadline;
      videoPlayType = ogAutoplay ? 'auto-play' : 'manual-play';
      videoTopics = ogTags;
      videoPlayerVersion = ogVersion;
      videoContentType = ogVidType;

      fireGtmEvent(videoDetails);

      // protect against the player not existing (just in case)
      if (typeof powa !== 'undefined') {
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

          (window.AmpVideoIframe = window.AmpVideoIframe || []).push(
            onAmpIntegrationReady,
          );
        }

        powa.on('start', (event) => {
          const {
            id: playerId,
            videoData,
            autoplay,
          } = event || {};
          const {
            canonical_url: vidCanonical,
            credits: vidCredits,
            description,
            duration = 0,
            headlines,
            taxonomy,
            _id: vId,
            version,
            video_type: vidType,
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
            videoTopics = tags;
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
    window.addEventListener('powaRender', e => powaRendered(e));
    const loadVideoScript = (rejectCallBack = () => null) => new Promise((resolve, reject) => {
      const videoScript = document.createElement('script');
      videoScript.type = 'text/javascript';
      videoScript.src = `https://d328y0m0mtvzqc.cloudfront.net/${currentEnv}/powaBoot.js?org=${siteOfRecord}`;
      videoScript.async = true;
      videoScript.addEventListener('load', () => {
        resolve();
      });
      videoScript.addEventListener('error', (e) => {
        reject(rejectCallBack(e));
      });
      document.body.appendChild(videoScript);
    });

    loadVideoScript();
    window.removeEventListener('powaRender', e => powaRendered(e));
  }, []);

  const videoMarginBottom = 'b-margin-bottom-d40-m20';
  const giveCredit = mainCredit ? `Credit: ${mainCredit}` : null;

  const smartChecker = () => {
    if (
      (isLeadVideo && !giveCredit && !videoCaption)
      || (isLeadVideo && giveCredit && !videoCaption && screenSize.width > maxTabletViewWidth)
      || (isInlineVideo && !videoCaption)
    ) {
      return null;
    }

    if (isLeadVideo && giveCredit && !videoCaption && screenSize.width < maxTabletViewWidth) {
      return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
    }

    return <Caption src={src} isLeadVideo videoCaption={videoCaption} />;
  };

  const renderPowaPlayer = () => <div
    className="powa"
    data-org={orgOfRecord}
    data-env={currentEnv}
    data-aspect-ratio="0.5625"
    data-uuid={vidId}
    data-autoplay={autoplayState}
    data-muted={muteON}
    data-playthrough={autoplayNext || true}
    data-discovery={autoplayNext || true}
     />;

  let ampVideoIframeDomain = `https://${orgOfRecord}-${siteOfRecord}-${currentEnv}.cdn.arcpublishing.com`;
  if (currentEnv === 'prod') {
    ampVideoIframeDomain = `https://www.${handleSiteName(siteOfRecord)}.com`;
  }

  const renderAmpPlayer = () => <amp-video-iframe width="16" height="9" layout="responsive" src={`${ampVideoIframeDomain}${videoPageUrl}?outputType=ampVideoIframe&autoplayState=${startPlaying}`} poster={thumbnailImage} autoplay={!startPlaying ? null : ''}></amp-video-iframe>;

  return (
    <div className={`c-video-component ${isInlineVideo ? videoMarginBottom : ''}`}>
      <div className="video-component">
        {isAmpOutput ? renderAmpPlayer() : renderPowaPlayer()}
      </div>
      {!isAmpOutput && <>
        <p className={`video-credit-text ${isInlineVideo ? 'is-inline' : null}`}>{giveCredit}</p>
        {smartChecker()}
      </>}
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
};

export default Video;
