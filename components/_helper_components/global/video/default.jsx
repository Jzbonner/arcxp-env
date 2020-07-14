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

  let mainCredit;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
  }
  const adTag = gamAdTagBuilder(pageTax, videoTax, vidId, currentEnv, videoPageUrl || requestUri);

  useEffect(() => {
    if (adTag) {
      window.PoWaSettings = window.PoWaSettings || {};
      window.PoWaSettings.advertising = window.PoWaSettings.advertising || {};
      window.PoWaSettings.advertising.adBar = true;
      window.PoWaSettings.advertising.adTag = adTag;
    }
    let videoTotalTime;
    let videoTitle;
    let videoPlayType;
    let videoPlayerVersion;
    let videoContentType;
    let videoTopics;
    const fireGtmEvent = (evt) => {
      const { time, type } = evt || {};
      // fire GTM events for various player events
      const dataLayer = window.dataLayer || [];
      let eventType = type;
      switch (type) {
        case 'powaRender':
          eventType = 'videoPlayerLoad';
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

        case 'start':
        case 'error':
        case 'adStart':
        case 'adComplete':
        case 'adError':
        case 'adSkip':
        default:
          // naming convention remains, we simply prepend "video" and capitalize the first letter
          eventType = `video${eventType.charAt(0).toUpperCase()}${eventType.slice(1)}`;
      }
      dataLayer.push({
        event: eventType,
        videoPayload: {
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
        },
      });
    };
    const powaRendered = (e) => {
      const id = get(e, 'detail.id');
      const powa = get(e, 'detail.powa');

      // protect against the player not existing (just in case)
      if (typeof powa !== 'undefined') {
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
        powa.on('playback0', evt => fireGtmEvent(evt));
        powa.on('playback25', evt => fireGtmEvent(evt));
        powa.on('playback50', evt => fireGtmEvent(evt));
        powa.on('playback75', evt => fireGtmEvent(evt));
        powa.on('playback100', evt => fireGtmEvent(evt));
        powa.on('error', evt => fireGtmEvent(evt));
        powa.on('adStart', evt => fireGtmEvent(evt));
        powa.on('adSkip', evt => fireGtmEvent(evt));
        powa.on('adError', evt => fireGtmEvent(evt));
        powa.on('adComplete', evt => fireGtmEvent(evt));
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
    data-autoplay={startPlaying}
    data-muted={muteON}
    data-playthrough={autoplayNext || true}
    data-discovery={autoplayNext || true}
     />;

  const ampVideoIframeUrl = `https://${orgOfRecord}-${siteOfRecord}-${currentEnv !== 'prod' ? 'sandbox' : 'prod'}.cdn.arcpublishing.com${videoPageUrl}?outputType=ampVideoIframe`;

  const renderAmpPlayer = () => <amp-iframe allowFullscreen={true} class="i-amphtml-layout-responsive i-amphtml-layout-size-defined i-amphtml-element i-amphtml-layout" frameBorder="0" height="225" i-amphtml-layout="responsive" layout="responsive" sandbox="allow-scripts allow-same-origin allow-popups" src={ampVideoIframeUrl} width="400" style={{ '--loader-delay-offset': '492ms !important' }}>
    <i-amphtml-sizer style={{ display: 'block', paddingTop: '56.2500%' }} slot="i-amphtml-svc"></i-amphtml-sizer>
    <amp-img class="i-amphtml-layout-fill i-amphtml-layout-size-defined i-amphtml-element i-amphtml-layout amp-hidden" i-amphtml-layout="fill" layout="fill" placeholder="" src={`https://www-ajc-com.cdn.ampproject.org/i/s/${thumbnailImage}`} i-amphtml-auto-lightbox-visited="">
      <img decoding="async" src={`https://www-ajc-com.cdn.ampproject.org/i/s/${thumbnailImage}`} className="i-amphtml-fill-content i-amphtml-replaced-content"></img>
    </amp-img>
    <i-amphtml-scroll-container class="amp-active">
      <iframe className="i-amphtml-fill-content" name="amp_iframe0" allowFullscreen="" frameBorder="0" allow="" sandbox="allow-scripts allow-same-origin allow-popups" src={ampVideoIframeUrl} style={{ zIndex: 0 }}></iframe>
    </i-amphtml-scroll-container>
  </amp-iframe>;

  return (
    <div className={`c-video-component ${isInlineVideo ? videoMarginBottom : ''}`}>
      <div className="video-component">
        {outputType === 'amp' ? renderAmpPlayer() : renderPowaPlayer()}
      </div>
      {outputType !== 'amp' && <>
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
