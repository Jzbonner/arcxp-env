import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext, useAppContext } from 'fusion:context';
import get from 'lodash.get';
import fetchEnv from '../utils/environment';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import gamAdTagBuilder from './_helper_functions/gamAdTagBuilder';
import './default.scss';
import '../../../../src/styles/base/_utility.scss';

const Video = ({
  src, isLeadVideo, isInlineVideo, maxTabletViewWidth, featuredVideoPlayerRules, inlineVideoPlayerRules, pageTaxonomy,
}) => {
  const appContext = useAppContext();
  const { requestUri } = appContext;
  const fusionContext = useFusionContext();
  const {
    credits,
    _id: videoID,
    videoPageId,
    taxonomy: videoTaxonomy,
    canonical_url: videoPageUrl,
  } = src || {};
  const { basic: videoCaption } = src.description ? src.description : {};
  const { startPlaying, muteON, autoplayNext } = featuredVideoPlayerRules || inlineVideoPlayerRules;
  const screenSize = checkWindowSize();
  const { outputType, arcSite = 'ajc', layout: pageLayout } = fusionContext;
  let vidId = videoID || videoPageId;
  const currentEnv = fetchEnv();


  let mainCredit;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
  }
  const adTag = gamAdTagBuilder(pageTaxonomy, videoTaxonomy, vidId, currentEnv, videoPageUrl || requestUri);

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
      dataLayer.push({
        event: type,
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
        powa.on('start', (event) => {
          // video start: update various elements (if/when necessary)
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
      videoScript.src = 'https://d328y0m0mtvzqc.cloudfront.net/sandbox/powaBoot.js?org=ajc';
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

  const rendePowaPlayer = () => <div
    className="powa"
    data-org={arcSite}
    data-api="sandbox"
    data-env={currentEnv}
    data-aspect-ratio="0.5625"
    data-uuid={vidId}
    data-autoplay={startPlaying}
    data-muted={muteON}
    data-playthrough={autoplayNext || true}
    data-discovery={autoplayNext || true} />;

  const renderAmpPlayer = () => {
    const [mp4Stream] = src.streams.filter(item => item.stream_type === 'mp4');
    const [webmStream] = src.streams.filter(item => item.stream_type === 'webm');
    const posterImage = get(src, 'promo_image.url');

    const controls = {
      controls: '',
      width: '640',
      height: '360',
      layout: 'responsive',
      poster: posterImage,
    };

    if (mp4Stream || webmStream) {
      return <amp-video {...controls}>
        {webmStream ? <source src={get(webmStream, 'url')} type="video/webm" /> : null}
        {mp4Stream ? <source src={get(mp4Stream, 'url')} type="video/mp4" /> : null}
      </amp-video>;
    }
    return null;
  };

  return (
    <div className={`c-video-component ${isInlineVideo ? videoMarginBottom : ''}`}>
      <div className="video-component">
        {outputType === 'amp' ? renderAmpPlayer() : rendePowaPlayer()}
      </div>
      <p className={`video-credit-text ${isInlineVideo ? 'is-inline' : null}`}>{giveCredit}</p>
      {smartChecker()}
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
